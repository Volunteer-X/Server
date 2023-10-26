import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/db-ping';

@Injectable()
export class PingPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
