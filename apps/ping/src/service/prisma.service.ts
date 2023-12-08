import { Injectable, OnModuleInit } from '@nestjs/common';
import { PingClient } from '@app/prisma';

@Injectable()
export class PingRepository extends PingClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
