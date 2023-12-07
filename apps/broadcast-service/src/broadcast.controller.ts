import { Controller, Get } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { PingNode, RMQService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class BroadcastController {
  constructor(
    private readonly broadcastService: BroadcastService,
    private readonly rmqService: RMQService,
  ) {}

  @EventPattern('broadcastPing')
  async handleBroadcastPing(
    @Payload() data: string,
    @Ctx() context: RmqContext,
  ) {
    const ping: PingNode = JSON.parse(data);
    this.broadcastService.broadcastPing(ping);
    this.rmqService.ack(context);
  }
}
