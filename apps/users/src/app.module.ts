import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { portConfig } from '@app/common';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [portConfig],
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
