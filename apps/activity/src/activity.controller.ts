import { Controller } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { IPing, RMQService } from '@app/common';

@Controller()
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly rmqService: RMQService,
  ) {}

  @EventPattern('pingCreated')
  async handlePingCreated(@Payload() data: string, @Ctx() context: RmqContext) {
    this.activityService.createActivity(JSON.parse(data) as IPing);
    this.rmqService.ack(context);
  }
}
