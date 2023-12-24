import { PingNode } from '@app/common';
import { Neo4jCommonService } from '@app/neo4j';
import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from '@app/firebase';

@Injectable()
export class BroadcastService {
  constructor(
    private readonly neo4jClient: Neo4jCommonService,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  /* 
  * Ping
  get all users 
  within a certain radius of a location 
  with similar picks
  */
  async broadcastPing(ping: PingNode) {
    // send to Neo4j get users and broadcast to them

    const cypher = ``;

    console.log('Broadcasting ping', ping);
  }

  test() {
    return this.firebase.messaging.send({
      notification: {
        title: 'Test',
        body: 'Test',
      },
      token: 'eQZ6ZQZ1QZqZ',
      android: { priority: 'high' },
      webpush: {
        headers: {
          Urgency: 'high',
        },
      },
    });
  }
}
