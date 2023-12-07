import { PingNode, UserNode } from '@app/common';
import { Neo4jCommonService } from '@app/neo4j';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Neo4jService {
  constructor(private readonly neo4jCommon: Neo4jCommonService) {}

  // Add a new user to the database
  async createUser(user: UserNode) {
    const cypher = `
      CREATE (u:User {id: $id, picks: $picks}, location: $location)
      RETURN u
    `;

    const result = await this.neo4jCommon.write(cypher, {
      id: user.id,
      picks: user.picks,
      location: `POINT(${user.latitude}, ${user.longitude})`,
    });

    if (result.records.length === 0) {
      throw new Error('User not created');
    }
  }

  // hydrate ping
  async createPing(ping: PingNode) {
    const cypher = `
      MERGE (u:User {id: $userID})
      MERGE (p:Ping {id: $id, location: $location, picks: $picks})
      MERGE (u)-[:CREATED]->(p)
      RETURN p
    `;

    const result = await this.neo4jCommon.write(cypher, {
      id: ping.id,
      userID: ping.userID,
      location: `POINT(${ping.location[0]}, ${ping.location[1]})`,
      picks: ping.picks,
    });

    if (result.records.length === 0) {
      throw new Error('Ping not created');
    }
  }
}
