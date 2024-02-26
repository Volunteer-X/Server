import {
  Failure,
  InternalServerError,
  NotFoundError,
  Success,
} from '@app/common';

import { CreateChannelDto } from './dto/createChannel.dto';
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
      return new Success(result);
    } catch (error) {
      console.error(error);
      return new Failure(new InternalServerError('Failed to create channel'));
    }
  }

  async getChannel(id: string) {
    try {
      const result = await this.channelRepository.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return new Success(result);
    } catch (error) {
      console.error(error);
      return new Failure(new NotFoundError('Channel not found'));
    }
  }
}
