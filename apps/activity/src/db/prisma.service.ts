import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/db-activity';

@Injectable()
export class ActivityRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
