import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as ForumClient } from '@prisma/client-forum';

@Injectable()
export class ForumRepository extends ForumClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
