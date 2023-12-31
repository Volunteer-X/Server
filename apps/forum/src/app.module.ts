import { Module } from '@nestjs/common';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [ChannelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
