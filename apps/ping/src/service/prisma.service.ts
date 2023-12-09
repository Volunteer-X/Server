import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PingClient } from '@prisma/client-ping';

@Injectable()
export class PingRepository extends PingClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
