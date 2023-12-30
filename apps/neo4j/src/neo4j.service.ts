import { BROADCAST_SERVICE, PingNode, UserNode } from '@app/common';
import { Neo4jCommonService } from '@app/neo4j';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class Neo4jService {
  constructor(
    private readonly neo4jCommon: Neo4jCommonService,
    @Inject(BROADCAST_SERVICE) private broadcastClient: ClientProxy,
  ) {}

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
}
