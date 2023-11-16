import { Controller, Get } from '@nestjs/common';
import { BroadcastServiceService } from './broadcast-service.service';

@Controller()
export class BroadcastServiceController {
  constructor(private readonly broadcastServiceService: BroadcastServiceService) {}

  @Get()
  getHello(): string {
    return this.broadcastServiceService.getHello();
  }
}
