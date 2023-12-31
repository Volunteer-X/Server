import { Module } from '@nestjs/common';
import { ForumController } from './channel.controller';
import { ForumService } from './channel.service';
import { ForumResolver } from './channel.resolver';
import { ChatGateway } from './chat.gatway';

@Module({
  imports: [],
  controllers: [ForumController],
  providers: [ForumService, ForumResolver, ChatGateway],
})
export class ForumModule {}
