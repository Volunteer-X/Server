import { Controller, Get } from '@nestjs/common';
import { FileFlowEngineService } from './file-flow-engine.service';

@Controller()
export class FileFlowEngineController {
  constructor(private readonly fileFlowEngineService: FileFlowEngineService) {}

  @Get()
  getHello(): string {
    return this.fileFlowEngineService.getHello();
  }
}
