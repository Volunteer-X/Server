import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './service/prisma.service';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/activity/.env',
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_ACTIVITY_QUEUE: Joi.string().required(),
        ACTIVITY_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
