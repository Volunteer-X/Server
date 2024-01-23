import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { ForumRepository } from '../service/forum.service';

@Module({
  exports: [MessageService],
  providers: [MessageResolver, MessageService, ForumRepository],
})
export class MessageModule {}
