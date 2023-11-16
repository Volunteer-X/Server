import { Module } from '@nestjs/common';
import { DeletionServiceController } from './deletion-service.controller';
import { DeletionServiceService } from './deletion-service.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [RmqModule],
  controllers: [DeletionServiceController],
  providers: [DeletionServiceService],
})
export class DeletionServiceModule {}
