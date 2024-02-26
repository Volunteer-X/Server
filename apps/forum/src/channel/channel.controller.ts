import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateChannelDto } from './dto/createChannel.dto';
import { RMQService } from '@app/common';

@Controller()
export class ChannelController {
  private readonly logger = new Logger(ChannelController.name);
  constructor(
    private readonly channelService: ChannelService,
    // private readonly rmqService: RMQService,
  ) {}

  // @EventPattern('createChannel')
  // async createChannel(@Payload() channel: Channel, @Ctx() context: RmqContext) {
  //   return await this.channelService.createChannel(channel);
  // }

  @Post('createChannel')
  async createChannel(@Body() payload: CreateChannelDto) {
    const result = await this.channelService.createChannel(payload);
    return result;
  }
}
