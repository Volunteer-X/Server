import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { portConfig } from '@app/common';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    PingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [portConfig],
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
