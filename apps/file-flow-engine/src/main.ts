import { NestFactory } from '@nestjs/core';
import { FileFlowEngineModule } from './file-flow-engine.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(FileFlowEngineModule);

  const configService = app.get(ConfigService);

  const port = configService.get('FILE_FLOW_ENGINE_PORT');

  await app.listen(port || 3550);

  console.log(
    '🚀 File  Flow Engine server running successfully on port:',
    port,
  );
}
bootstrap();
