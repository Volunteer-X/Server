import {
  BROADCAST_SERVICE,
  NEO4J_SERVICE,
  PingNode,
  USER_SERVICE,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from '@app/firebase';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BroadcastService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    @Inject(NEO4J_SERVICE) private neo4jClient: ClientProxy,
    @Inject(USER_SERVICE) private userClient: ClientProxy,
  ) {}

  /* 
  * Ping
  get all users 
  within a certain radius of a location 
  with similar picks
  */

  async broadcastPing(id: string, users: string[]) {
    // get user device token from the user service and broadcast to them
    const tokens = await lastValueFrom(
      this.userClient.send<string[], string[]>('userDevices', users),
    );

    console.log('Broadcast Service:: tokens', tokens);

    // if (tokens.length === 0) {
    //   return;
    // }

    // send ping to users
    this.firebase.messaging
      .sendEachForMulticast({
        tokens: [
          'eK_p6UbuSka3aXetlqcPWg:APA91bGtfrwnvoUhSGBcbjbsCNIjhk9pkfqQgErJNfh7JnN2jqG-yKYof3I2hlKE9LUXzR2XSKYaxy2p_GkjUrI7kPuXzYVlrhbzU_okVCh5oBYpzCMaTdzu5gcnlLGPB3YtnpriHnrQ',
        ],
        data: {
          type: 'ping',
          id,
        },
      })
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }

  async test() {
    // let _data;
    // this.neo4jClient.send('test', 'test').subscribe((data) => {
    //   console.log('data', data);
    //   _data = data;
    // });

    // return _data;

    const message = await this.firebase.messaging.send({
      token:
        'eK_p6UbuSka3aXetlqcPWg:APA91bGtfrwnvoUhSGBcbjbsCNIjhk9pkfqQgErJNfh7JnN2jqG-yKYof3I2hlKE9LUXzR2XSKYaxy2p_GkjUrI7kPuXzYVlrhbzU_okVCh5oBYpzCMaTdzu5gcnlLGPB3YtnpriHnrQ',
      data: {
        type: 'ping',
        id: '6576257c3120201ecfdf6482',
      },
    });
    return message;
  }
}
