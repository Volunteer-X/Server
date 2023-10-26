import { Module } from '@nestjs/common';
import { DeletionServiceController } from './deletion-service.controller';
import { DeletionServiceService } from './deletion-service.service';
import { RMQModule } from '@app/common';

@Module({
  imports: [RMQModule],
  controllers: [DeletionServiceController],
  providers: [DeletionServiceService],
})
export class DeletionServiceModule {}
