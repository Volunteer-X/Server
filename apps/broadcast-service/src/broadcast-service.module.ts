import { Module } from '@nestjs/common';
import { BroadcastServiceController } from './broadcast-service.controller';
import { BroadcastServiceService } from './broadcast-service.service';

@Module({
  imports: [],
  controllers: [BroadcastServiceController],
  providers: [BroadcastServiceService],
})
export class BroadcastServiceModule {}
