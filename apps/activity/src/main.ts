import { NestFactory } from '@nestjs/core';
import { ActivityModule } from './activity.module';
import { RMQService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ActivityModule);

  // Microservice
  // RMQ
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('ACTIVITY'));

  // Microservice - Run
  await app.startAllMicroservices();

  // TCP - GraphQL
  const port = app.get(ConfigService).get('ACTIVITY_PORT');
  await app.listen(port);

  console.log('🚀 Activity server running on port:: ', port);
}
bootstrap();
