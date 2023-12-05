import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    PrismaModule.register({ logQueries: false }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
