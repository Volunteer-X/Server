import { NEO4J_SERVICE, PingNode } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from '@app/firebase';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BroadcastService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    @Inject(NEO4J_SERVICE) private neo4jClient: ClientProxy,
  ) {}

  /* 
  * Ping
  get all users 
  within a certain radius of a location 
  with similar picks
  */
  async broadcastPing(id: string) {
    console.log('broadcastPing', id);

    // send to Neo4j get users and broadcast to them
  }

  async test() {
    let _data;
    this.neo4jClient.send('test', 'test').subscribe((data) => {
      console.log('data', data);
      _data = data;
    });

    return _data;

    // const message = await this.firebase.messaging.send({
    //   token:
    //     'c-7e2Bk-TNSWGRmm9jvAhX:APA91bF_x6G1qvLKN748GLMK3T_npwY7Bc5g-DlbDiRqOi-iM1Eci7_-b3MtWcb7csSwDys17K3veCbWcxK-26qyWAt2jNYgE8mPE64VA4qcBsqVMOPqofCZu7LIvTVQ-L8kkMtgptsS',
    //   data: {
    //     type: 'ping',
    //     id: '6576257c3120201ecfdf6482',
    //   },
    // });
    // return message;
  }
}
