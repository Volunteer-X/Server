import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { RMQModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    RMQModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/activity/.env',
      validationSchema: Joi.object({
        ACTIVITY_PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_ACTIVITY_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [ActivityService],
})
export class ActivityModule {}
