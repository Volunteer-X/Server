import { Module } from '@nestjs/common';
import { BroadcastController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jModule } from '@neo4j/neo4j.module';
import { Neo4jConfig, Neo4jScheme } from '@neo4j/neo4j-config.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    Neo4jModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Neo4jConfig => ({
        scheme: configService.get<Neo4jScheme>('NEO4J_SCHEME'),
        host: configService.get<string>('NEO4J_HOST'),
        port: configService.get<number>('NEO4J_PORT'),
        username: configService.get<string>('NEO4J_USERNAME'),
        password: configService.get<string>('NEO4J_PASSWORD'),
        database: configService.get<string>('NEO4J_DATABASE'),
      }),
    }),
  ],

  controllers: [BroadcastController],
  providers: [BroadcastService],
})
export class BroadcastModule {}
