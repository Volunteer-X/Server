import { NestFactory } from '@nestjs/core';
import { Neo4jModule } from './neo4j.module';
import { RMQService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(Neo4jModule);

  const rmqService = app.get<RMQService>(RMQService);

  const configService = app.get(ConfigService);

  const port = configService.get('NEO4J_PORT');

  // console.log('rmqService', rmqService.getOptions('NEO4J'));

  app.connectMicroservice(rmqService.getOptions('NEO4J'));

  await app.startAllMicroservices();

  await app.listen(port);

  console.log('🚀 Ping server running successfully on port:', port);
}
bootstrap();
