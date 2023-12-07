import { NestFactory } from '@nestjs/core';
import { Neo4jModule } from './neo4j.module';
import { RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(Neo4jModule);

  const rmqService = app.get<RMQService>(RMQService);

  console.log('rmqService', rmqService.getOptions('NEO4J'));

  app.connectMicroservice(rmqService.getOptions('NEO4J'));

  await app.startAllMicroservices();

  await app.listen(7687);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
