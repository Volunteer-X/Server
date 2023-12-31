import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { ChannelGateway } from './channel.gatway';
import { ForumRepository } from '../service/prisma.service';

@Module({
  imports: [],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelResolver, ChannelGateway, ForumRepository],
})
export class ChannelModule {}
