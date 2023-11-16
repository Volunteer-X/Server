import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { BroadcastModule } from './broadcast.module';
import { Neo4jErrorFilter } from '@neo4j/neo4j-error.filter';
import { Neo4jTypeInterceptor } from '@neo4j/neo4j-type.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(BroadcastModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new Neo4jTypeInterceptor());
  app.useGlobalFilters(new Neo4jErrorFilter());

  await app.listen(4852);
}
bootstrap();
