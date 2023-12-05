import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { portConfig } from '@app/common';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [portConfig],
      expandVariables: true,
      envFilePath: ['./apps/users/.env'],
    }),
    HealthModule,
  ],
})
export class AppModule {}
