import { Injectable, OnModuleInit } from '@nestjs/common';
import { PingClient } from '@generated/client';

@Injectable()
export class PingRepository extends PingClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
