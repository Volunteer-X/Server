import { BROADCAST_SERVICE, PingNode, UserNode } from '@app/common';
import { Neo4jCommonService } from '@app/neo4j';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class Neo4jService {
  constructor(
    private readonly neo4jCommon: Neo4jCommonService,
    @Inject(BROADCAST_SERVICE) private broadcastClient: ClientProxy,
  ) {}

  private readonly logger = new Logger(Neo4jService.name);

  // Add a new user to the database
  async createUser(user: UserNode) {
    const cypher = `
      CREATE (u:User {id: $id, picks: $picks, latitude: $latitude, longitude: $longitude})
      RETURN u
    `;

    const result = await this.neo4jCommon.write(cypher, {
      id: user.id,
      picks: user.picks,
      latitude: user.latitude,
      longitude: user.longitude,
    });

    // console.log(result.records[0].get('u').properties);

    if (result.records.length === 0) {
      throw new Error('User not created');
    }
  }

  // hydrate ping
  async createPing(_ping: PingNode) {
    const cypher = `
      MERGE (u:User {id: $userID})
      MERGE (p:Ping {id: $id, latitude: $latitude, longitude: $longitude, picks: $picks})
      MERGE (u)-[:CREATED]->(p)
      RETURN p
    `;

    const { id, userID, picks, point, radius } = _ping;

    try {
      const ping = await this.neo4jCommon.write(cypher, {
        id: id,
        userID: userID,
        latitude: point[0],
        longitude: point[1],
        picks: picks,
      });

      this.getUsersWithinRadius(
        ping.records[0].get('p').properties,
        radius,
        userID,
      );
    } catch (error) {
      console.log(error);
      throw new Error('Ping not created');
    }
  }

  // get all users within a certain radius of a location with similar picks
  async getUsersWithinRadius(ping: any, radius: number, userID: string) {
    /**
     * The Cypher query used to match users based on certain criteria.
     * @remarks
     * The query filters users based on their distance from a given latitude and longitude,
     * as well as their picks matching a provided array of picks.
     * @param userID - The ID of the user to exclude from the results.
     * @param latitude - The latitude used to calculate the distance.
     * @param longitude - The longitude used to calculate the distance.
     * @param picks - An array of picks to match against the user's picks.
     * @returns The matched users.
     */
    const cypher = `
    MATCH (u:User)
    WHERE
      u.id <> $userID
      AND
      point.distance(
        point({
          latitude: u.latitude,
          longitude: u.longitude
        }),
        point({
          latitude: $latitude,
          longitude: $longitude
        })
      ) <= 2000 
      AND
      ANY (
        pick in u.picks WHERE pick in $picks
      )
    RETURN u
    `;

    const result = await this.neo4jCommon.read(cypher, {
      latitude: ping.latitude,
      longitude: ping.longitude,
      picks: ping.picks,
      radius: radius,
      userID: userID,
    });

    if (result.records.length === 0) {
      throw new Error('No users found');
    }

    const users: string[] = result.records
      .map((record) => record.get('u').properties)
      .map((user) => user.id);

    this.broadcastClient.emit<string, string>(
      'broadcastPing',
      JSON.stringify({
        id: ping.id,
        users,
      }),
    );

    return users;
  }

  async getPingsWithinRadius(
    payload: any,
    first: number,
    after: string,
    picks: string[] = null,
    userID: string,
  ) {
    const cypher = `
    WITH point({latitude: $latitude, longitude: $longitude}) AS centerPoint
    OPTIONAL MATCH (ping:Ping)
      WHERE NOT (:User {id: $userID})-[:CREATED]->(ping)
      AND 
      point.distance(
        point(
          {
            latitude: ping.latitude,
            longitude: ping.longitude
          }), 
          centerPoint) <= $radius
      AND coalesce(ANY(picks IN ping.picks WHERE picks IN $picks), TRUE)
    WITH count(ping) AS totalCount, centerPoint
    OPTIONAL MATCH (ping:Ping)
      WHERE point.distance(
        point(
          {
            latitude: ping.latitude, 
            longitude: ping.longitude
          }), 
          centerPoint) <= $radius
        AND NOT (:User {id: $userID})-[:CREATED]->(ping)
        AND coalesce(ANY(picks IN ping.picks WHERE picks IN $picks), TRUE)
    WITH ping, totalCount
    LIMIT $first
    WITH collect(ping.id) AS IDs, totalCount
    RETURN CASE 
      WHEN totalCount=0 THEN {totalCount: 0, data: []}
      ELSE {totalCount: totalCount, data: IDs}
    END AS result
    `;

    console.log(userID);

    const { latitude, longitude, radius } = payload;

    const result = await this.neo4jCommon.read(cypher, {
      latitude,
      longitude,
      radius,
      cursor: after,
      picks,
      first: this.neo4jCommon.int(first),
      userID,
    });

    const data: string[] = result.records[0].get('result').data;
    const totalCount: number = result.records[0]
      .get('result')
      .totalCount.toNumber();

    return {
      totalCount,
      data,
    };
  }

  async addParticipant(userID: string, id: string) {
    const cypher = `
    MATCH (user:User {id: $userID}), (ping:Ping {id: $id})
    MERGE (user)-[:PARTICIPATED {since: $time}]->(ping)
    RETURN ping
    `;

    const result = await this.neo4jCommon.write(cypher, {
      userID,
      id,
      time: new Date().toISOString(),
    });

    if (result.records.length === 0) {
      throw new Error('Participant not added');
    }

    this.logger.log(
      'participant added',
      result.records[0].get('ping').properties,
    );
  }

  async removeParticipant(userID: string, id: string) {
    const cypher = `
    MATCH (user:User {id: $userID})-[r:PARTICIPATED]->(ping:Ping {id: $id})
    DELETE r
    RETURN ping
    `;

    const result = await this.neo4jCommon.write(cypher, {
      userID,
      id,
    });

    if (result.records.length === 0) {
      throw new Error('Participant not removed');
    }

    this.logger.log(
      'participant removed',
      result.records[0].get('ping').properties,
    );
  }
}
