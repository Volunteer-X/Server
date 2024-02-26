import { CreateChannelDto, UpdateChannelDto } from './dto';
import {
  Failure,
  InternalServerError,
  NotFoundError,
  Success,
} from '@app/common';

import { Channel } from './entity/channel';
import { ForumRepository } from '../service/forum.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelService {
  constructor(private readonly repository: ForumRepository) {}

  private readonly channelRepository = this.repository.channel;

  async createChannel(payload: CreateChannelDto) {
    const { activityId, admin, title } = payload;

    try {
      const result = await this.channelRepository.create({
        data: {
          activityId,
          admin,
          title,
        },
      });
      return new Success(Channel.ToEntityFromPrisma(result));
    } catch (error) {
      console.error(error);
      console.log('Failed to create channel', error);

      return new Failure(new InternalServerError('Failed to create channel'));
    }
  }

  async updateChannel(id: string, payload: UpdateChannelDto) {
    try {
      const result = await this.channelRepository.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });
      return new Success(result);
    } catch (error) {
      console.error(error);
      return new Failure(new InternalServerError('Failed to update channel'));
    }
  }

  async getChannel(id: string) {
    try {
      const result = await this.channelRepository.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      return new NotFoundError('Channel not found');
    }
  }

  getChannelsByUser(user: string) {
    throw new Error('Method not implemented.');
  }
  getChannelsByAdmin(admin: string) {
    throw new Error('Method not implemented.');
  }
}
