import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { BroadcastModule } from './broadcast.module';
import { Neo4jErrorFilter, Neo4jTypeInterceptor } from '@app/neo4j';
import { RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BroadcastModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new Neo4jTypeInterceptor());
  app.useGlobalFilters(new Neo4jErrorFilter());

  const rmqService = app.get<RMQService>(RMQService);

  app.connectMicroservice(rmqService.getOptions('BROADCAST'));

  await app.startAllMicroservices();

  const port = app.get('ConfigService').get('PORT');

  await app.listen(port);

  console.log('🚀 Ping server running successfully on port:', port);
}
bootstrap();
