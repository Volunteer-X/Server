import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { portConfig } from '@app/common';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    UserModule,
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
