import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './db/prisma.service';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/activity/.env',
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_ACTIVITY_QUEUE: Joi.string().required(),
        ACTIVITY_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
