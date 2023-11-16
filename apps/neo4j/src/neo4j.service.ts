import { PingNode, UserNode } from '@app/common';
import { Neo4jCommonService } from '@app/neo4j';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Neo4jService {
  constructor(private readonly neo4jCommon: Neo4jCommonService) {}

  // Add a new user to the database
  async createUser(user: UserNode) {
    const cypher = `
      CREATE (u:User {id: $id, picks: $picks})
      RETURN u
    `;

    const result = await this.neo4jCommon.write(cypher, {
      id: user.id,
      picks: user.picks,
    });

    if (result.records.length === 0) {
      throw new Error('User not created');
    }
  }

  // update a user's picks
  async updateUserPicks(newData: UserNode) {}

  // update a user's location
  async updateUserLocation(newData: UserNode) {}

  // hydrate ping
  async createPing(ping: PingNode) {
    const cypher = `
      CREATE (p:Ping {id: $id, location: $location, picks: $picks})
      RETURN p
    `;

    const result = await this.neo4jCommon.write(cypher, {
      id: ping.id,
      location: ping.location,
      picks: ping.picks,
    });

    if (result.records.length === 0) {
      throw new Error('Ping not created');
    }
  }

  /* 
  * Ping
  get all users 
  within a certain radius of a location 
  with similar picks
  */
  async getUsersByLocationAndPicks(location: string, picks: string[]) {}
}
