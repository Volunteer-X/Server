import { Injectable } from '@nestjs/common';
import { Channel } from 'apps/forum/src/common/dto/message.dto';
import { ForumRepository } from '../service/forum.service';

@Injectable()
export class ChannelService {
  constructor(private readonly repository: ForumRepository) {}

  private readonly channelRepository = this.repository.channel;

  async createChannel(channel: Channel) {
    try {
      const result = await this.channelRepository.create({
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
