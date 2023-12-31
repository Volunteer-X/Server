import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { ForumRepository } from '../service/prisma.service';

@Module({
  providers: [MessageResolver, MessageService, ForumRepository],
})
export class MessageModule {}
