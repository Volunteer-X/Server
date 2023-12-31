import { Module } from '@nestjs/common';
import { BroadcastController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { NEO4J_SERVICE, RmqModule, USER_SERVICE } from '@app/common';
import { HealthModule } from './health/health.module';
import { FirebaseModule } from '@app/firebase';
import * as path from 'path';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: path.join(
        __dirname,
        '..',
        '..',
        '..',
        'firebase.json',
      ),
    }),
    HealthModule,
    RmqModule,
    RmqModule.register({ name: [NEO4J_SERVICE, USER_SERVICE] }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/broadcast-service/.env',
      validationSchema: Joi.object({
        // NEO4J_SCHEME: Joi.string().required(),
        // NEO4J_HOST: Joi.string().required(),
        // NEO4J_PORT: Joi.number().required(),
        // NEO4J_USERNAME: Joi.string().required(),
        // NEO4J_PASSWORD: Joi.string().required(),
        // NEO4J_DATABASE: Joi.string(),
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_BROADCAST_QUEUE: Joi.string().required(),
      }),
    }),
    // Neo4jCommonModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService): Neo4jConfig => ({
    //     scheme: configService.get<Neo4jScheme>('NEO4J_SCHEME'),
    //     host: configService.get<string>('NEO4J_HOST'),
    //     port: configService.get<number>('NEO4J_PORT'),
    //     username: configService.get<string>('NEO4J_USERNAME'),
    //     password: configService.get<string>('NEO4J_PASSWORD'),
    //     database: configService.get<string>('NEO4J_DATABASE'),
    //   }),
    // }),
  ],

  controllers: [BroadcastController],
  providers: [BroadcastService],
})
export class BroadcastModule {}
