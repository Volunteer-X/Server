import {
  Controller,
  Get,
  Header,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileFlowEngineService } from './file-flow-engine.service';
import { AWSService } from './aws-s3/aws.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/')
export class FileFlowEngineController {
  constructor(
    private readonly fileFlowEngineService: FileFlowEngineService,
    private readonly awsService: AWSService,
  ) {}

  private readonly logger = new Logger(FileFlowEngineController.name);

  @Get('upload')
  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard())
  async getAWSPresignedUrl(@Query('type') type: string) {
    console.log(type);
    const { Key, signedUrl } = await this.awsService.createPresignedUrl(type);

    return {
      signedUrl,
      Key,
    };
  }

  @Get('download/')
  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard())
  async getAWSPresignedUrlDownload(
    @Query('Key') Key: string,
    @Query('type') type: string,
  ) {
    const uri = await this.awsService.createPresignedUrlDownload(Key, type);

    // console.log(type);

    return {
      uri,
    };
  }
}
