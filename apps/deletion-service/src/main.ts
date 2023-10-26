import { NestFactory } from '@nestjs/core';
import { DeletionServiceModule } from './deletion-service.module';
import { RMQService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(DeletionServiceModule);
  const rmqService = app.get<RMQService>(RMQService);
  app.connectMicroservice(rmqService.getOptions('DELETION_SERVICE'));

  await app.startAllMicroservices();
}
bootstrap();
