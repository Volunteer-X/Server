import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { ChannelGateway } from './channel.gatway';

@Module({
  imports: [],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelResolver, ChannelGateway],
})
export class ChannelModule {}
