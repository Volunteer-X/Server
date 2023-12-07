import { PingNode } from '@app/common';
import { Neo4jCommonService } from '@app/neo4j';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BroadcastService {
  constructor(private readonly neo4jClient: Neo4jCommonService) {}

  async broadcastPing(ping: PingNode) {
    // send to Neo4j get users and broadcast to them

    const cypher = ``;

    console.log('Broadcasting ping', ping);
  }
}
