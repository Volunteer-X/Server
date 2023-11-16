import { Controller, Get } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';

@Controller()
export class BroadcastController {
  constructor(private readonly broadcastService: BroadcastService) {}

  @Get()
  getHello(): string {
    return this.broadcastService.getHello();
  }
}
