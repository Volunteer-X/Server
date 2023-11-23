import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CustomSnawflake } from 'libs/utils/snowflake';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get('PING_PORT');

  await app.listen(port);

  console.log('🚀 Ping server running successfully on port:', port);

  const snowflake = new CustomSnawflake();

  setTimeout(() => {
    console.log('Snowflake ID:', snowflake.getIDFromTimeStamp());
    console.log('Snowflake ID:', snowflake.getUniqueID());
  }, 1000);
}
bootstrap();
