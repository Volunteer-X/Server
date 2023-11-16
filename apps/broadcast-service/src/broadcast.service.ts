import { Injectable } from '@nestjs/common';

@Injectable()
export class BroadcastService {
  getHello(): string {
    return 'Hello World!';
  }
}
