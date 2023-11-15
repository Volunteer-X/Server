import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { portConfig } from '@app/common';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    PingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: './apps/ping/.env',
    }),
  ],
})
export class AppModule {}
