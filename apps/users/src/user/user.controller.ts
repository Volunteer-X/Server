import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { Pattern, RMQService } from '@app/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Membership } from '@prisma/client';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rmqService: RMQService,
  ) {}

  private readonly logger = new Logger(UserController.name);

  /*
   * return user devices as an array of strings
   */
  @MessagePattern(Pattern.userDevices)
  async getUserDevices(@Payload() users: string[], @Ctx() context: RmqContext) {
    const userDevices = await this.userService.getUserDevices(users);

    this.rmqService.ack(context);
    return userDevices;
  }

  @EventPattern(Pattern.addMembership)
  async addMembership(
    @Payload() payload: { userID: string; id: string; membership: Membership },
  ) {
    const { userID, id, membership } = payload;

    this.logger.log(payload);

    await this.userService.addMembership(userID, id, membership);
  }

  @EventPattern(Pattern.removeMembership)
  async removeMembership(@Payload() payload: { userID: string; id: string }) {
    const { userID, id } = payload;

    await this.userService.removeMembership(userID, id);
  }
}
