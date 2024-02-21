import { RMQService, USER_SERVICE } from '@app/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const rmqService = app.get<RMQService>(RMQService);

  const configService = app.get(ConfigService);

  const port = configService.get('USER_PORT');

  // app.connectMicroservice(rmqService.getOptions(USER_SERVICE));

  // await app.startAllMicroservices();

  await app.listen(port);

  console.log('🚀 User server running successfully on port:: ', port);
}
bootstrap();
