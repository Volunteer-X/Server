import { NestFactory } from '@nestjs/core';
import { SubscriptionModule } from './subscription.module';

async function bootstrap() {
  const app = await NestFactory.create(SubscriptionModule);
  await app.listen(3000);
}
bootstrap();
