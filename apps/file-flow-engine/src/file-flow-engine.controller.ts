import { Controller, Get, Header, Logger, Param } from '@nestjs/common';
import { FileFlowEngineService } from './file-flow-engine.service';
import { AWSService } from './aws-s3/aws.service';

@Controller()
export class FileFlowEngineController {
  constructor(
    private readonly fileFlowEngineService: FileFlowEngineService,
    private readonly awsService: AWSService,
  ) {}

  private readonly logger = new Logger(FileFlowEngineController.name);

  @Get(':key')
  @Header('Content-Type', 'application/octet-stream')
  async getAWSPresignedUrl(@Param('key') key) {
    const signedUrl = await this.awsService.createPresignedUrl({ key });

    return {
      signedUrl,
      fileKey: key,
    };
  }
}
