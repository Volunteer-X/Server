import { Module } from '@nestjs/common';
import { FileFlowEngineController } from './file-flow-engine.controller';
import { FileFlowEngineService } from './file-flow-engine.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/file-flow-engine/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
      }),
    }),
  ],
  controllers: [FileFlowEngineController],
  providers: [FileFlowEngineService],
})
export class FileFlowEngineModule {}
