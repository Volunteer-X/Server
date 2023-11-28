import { Module } from '@nestjs/common';
import { FileFlowEngineController } from './file-flow-engine.controller';
import { FileFlowEngineService } from './file-flow-engine.service';

@Module({
  imports: [],
  controllers: [FileFlowEngineController],
  providers: [FileFlowEngineService],
})
export class FileFlowEngineModule {}
