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

  @Get('signedUrl')
  @Header('Content-Type', 'application/octet-stream')
  async getAWSPresignedUrl() {
    const { Key, signedUrl } = await this.awsService.createPresignedUrl();

    return {
      signedUrl,
      Key,
    };
  }
}
