import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Channel } from 'apps/forum/src/common/dto/message.dto';
import { RMQService } from '@app/common';

@Controller()
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService, // private readonly rmqService: RMQService,
  ) {}

  // @EventPattern('createChannel')
  // async createChannel(@Payload() channel: Channel, @Ctx() context: RmqContext) {
  //   return await this.channelService.createChannel(channel);
  // }

  @Post('createChannel')
  async createChannel(@Body() channel: Channel) {
    const result = await this.channelService.createChannel(channel);
    return result;
  }
}
