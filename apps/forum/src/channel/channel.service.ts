import { Injectable } from '@nestjs/common';
import { Channel } from 'apps/forum/src/common/dto/message.dto';
import { ForumRepository } from 'apps/forum/src/service/prisma.service';

@Injectable()
export class ChannelService {
  constructor(private readonly channelRepository: ForumRepository) {}

  async createChannel(channel: Channel) {
    try {
      const result = await this.channelRepository.channel.create({
        data: {
          activityID: channel.activityID,
          admin: channel.admin,
          title: channel.title,
          participants: channel.participants,
        },
      });

      return { success: true, message: 'Channel created', result };
    } catch (error) {
      console.log(error);

      return { success: false, message: 'Channel was not created' };
    }
  }
}
