import { Injectable } from '@nestjs/common';

@Injectable()
export class BroadcastServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
