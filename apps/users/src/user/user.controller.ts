import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { RMQService } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rmqService: RMQService,
  ) {}

  /*
   * return user devices as an array of strings
   */
  @MessagePattern('userDevices')
  async getUserDevices(@Payload() users: string[], @Ctx() context: RmqContext) {
    const userDevices = await this.userService.getUserDevices(users);

    this.rmqService.ack(context);
    return userDevices;
  }
}
