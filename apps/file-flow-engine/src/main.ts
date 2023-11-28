import { NestFactory } from '@nestjs/core';
import { FileFlowEngineModule } from './file-flow-engine.module';

async function bootstrap() {
  const app = await NestFactory.create(FileFlowEngineModule);
  await app.listen(3000);
}
bootstrap();
