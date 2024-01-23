import { Module } from '@nestjs/common';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChannelModule,
    MessageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/forum/.env',
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
