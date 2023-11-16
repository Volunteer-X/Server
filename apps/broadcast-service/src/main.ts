import { NestFactory } from '@nestjs/core';
import { BroadcastServiceModule } from './broadcast-service.module';

async function bootstrap() {
  const app = await NestFactory.create(BroadcastServiceModule);
  await app.listen(3000);
}
bootstrap();
