import { Module } from '@nestjs/common';
import { Neo4jController } from './neo4j.controller';
import { Neo4jService } from './neo4j.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { Neo4jConfig, Neo4jScheme } from '@app/neo4j/neo4j-config.interface';
import { Neo4jCommonModule } from '@app/neo4j';
import { BROADCAST_SERVICE, RmqModule } from '@app/common';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    HealthModule,
    RmqModule,
    RmqModule.register({ name: [BROADCAST_SERVICE] }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/neo4j/.env',
      validationSchema: Joi.object({
        NEO4J_SCHEME: Joi.string().required(),
        NEO4J_HOST: Joi.string().required(),
        NEO4J_PORT: Joi.number().required(),
        NEO4J_USERNAME: Joi.string().required(),
        NEO4J_PASSWORD: Joi.string().required(),
        NEO4J_DATABASE: Joi.string(),
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_NEO4J_QUEUE: Joi.string().required(),
      }),
    }),
    Neo4jCommonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Neo4jConfig => ({
        scheme: configService.get<Neo4jScheme>('NEO4J_SCHEME'),
        host: configService.get<string>('NEO4J_HOST'),
        port: configService.get<number>('NEO4J_PORT'),
        username: configService.get<string>('NEO4J_USERNAME'),
        password: configService.get<string>('NEO4J_PASSWORD'),
        database: configService.get<string>('NEO4J_DATABASE'),
      }),
    }),
  ],
  controllers: [Neo4jController],
  providers: [Neo4jService],
})
export class Neo4jModule {}
