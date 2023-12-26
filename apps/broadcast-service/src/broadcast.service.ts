import { PingNode } from '@app/common';
import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from '@app/firebase';

@Injectable()
export class BroadcastService {
  constructor(
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
  }

  async test() {
    const message = await this.firebase.messaging.send({
      token:
        'c-7e2Bk-TNSWGRmm9jvAhX:APA91bF_x6G1qvLKN748GLMK3T_npwY7Bc5g-DlbDiRqOi-iM1Eci7_-b3MtWcb7csSwDys17K3veCbWcxK-26qyWAt2jNYgE8mPE64VA4qcBsqVMOPqofCZu7LIvTVQ-L8kkMtgptsS',
      data: {
        type: 'ping',
        id: '6576257c3120201ecfdf6482',
      },
    });

    return message;
  }
}
