import { Module } from '@nestjs/common';
import { ForumModule } from './channel/channel.module';

@Module({
  imports: [ForumModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
