import { Controller, Get } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller()
export class ChannelController {
  constructor(private readonly forumService: ChannelService) {}

  @Get()
  getHello(): string {
    return this.forumService.getHello();
  }
}
