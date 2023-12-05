import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { portConfig } from '@app/common';
import { PingModule } from './ping/ping.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    PingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: './apps/ping/.env',
    }),
    HealthModule,
  ],
})
export class AppModule {}
