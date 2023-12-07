import { NestFactory } from '@nestjs/core';
import { Neo4jModule } from './neo4j.module';
import { RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(Neo4jModule);

  const rmqService = app.get<RMQService>(RMQService);

  // console.log('rmqService', rmqService.getOptions('NEO4J'));

  app.connectMicroservice(rmqService.getOptions('NEO4J'));

  await app.startAllMicroservices();

  const port = app.get('ConfigService').get('PORT');

  await app.listen(port);

  console.log('🚀 Ping server running successfully on port:', port);
}
bootstrap();
