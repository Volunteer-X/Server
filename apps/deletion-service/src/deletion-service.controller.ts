import { Controller, Get } from '@nestjs/common';
import { DeletionServiceService } from './deletion-service.service';

@Controller()
export class DeletionServiceController {
  constructor(private readonly deletionServiceService: DeletionServiceService) {}

  @Get()
  getHello(): string {
    return this.deletionServiceService.getHello();
  }
}
