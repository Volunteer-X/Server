import { Controller, Get, Header, Logger, Param } from '@nestjs/common';
import { FileFlowEngineService } from './file-flow-engine.service';
import { AWSService } from './aws-s3/aws.service';

@Controller('api/v1/')
export class FileFlowEngineController {
  constructor(
    private readonly fileFlowEngineService: FileFlowEngineService,
    private readonly awsService: AWSService,
  ) {}

  private readonly logger = new Logger(FileFlowEngineController.name);

  @Get(':mimeType')
  @Header('Content-Type', 'application/json')
  async getAWSPresignedUrl(@Param('mimeType') type: string) {
    console.log(type);
    const { Key, signedUrl } = await this.awsService.createPresignedUrl(type);

    return {
      signedUrl,
      Key,
    };
  }
}
