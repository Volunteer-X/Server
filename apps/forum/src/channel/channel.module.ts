import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { ChannelGateway } from './channel.gatway';
import { ForumRepository } from '../service/prisma.service';
import { MessageModule } from '../message/message.module';
import { RmqModule } from '@app/common';
import { MessageService } from '../message/message.service';

@Module({
  imports: [MessageModule],
  controllers: [ChannelController],
  providers: [
    ChannelService,
    ChannelResolver,
    ChannelGateway,
    MessageService,
    ForumRepository,
  ],
})
export class ChannelModule {}
