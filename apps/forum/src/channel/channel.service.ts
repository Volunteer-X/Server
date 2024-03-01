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

  /**
   * Creates a new channel.
   * @param payload - The payload containing the necessary data to create the channel.
   * @returns A Success object with the created channel if successful, or a Failure object with an error message if unsuccessful.
   */
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

  /**
   * Updates a channel with the specified ID.
   * @param id - The ID of the channel to update.
   * @param payload - The data to update the channel with.
   * @returns A `Success` object containing the result of the update operation if successful, or a `Failure` object with an `InternalServerError` if the update fails.
   */
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

  /**
   * Retrieves a channel by its ID.
   * @param id - The ID of the channel to retrieve.
   * @returns A Promise that resolves to the channel if found, or throws a NotFoundError if not found.
   */
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

  async getChannelsByUser(user: string) {
    try {
      const channels = await this.channelRepository.findMany({
        where: {
          admin: user,
        },
      });

      if (!channels.length)
        return new NotFoundError('No Channel under this user id found');

      return channels.map(Channel.ToEntityFromPrisma);
    } catch (error) {
      console.error(error);
      return new InternalServerError('Failed to get channels');
    }
  }
  getChannelsByAdmin(admin: string) {
    throw new Error('Method not implemented.');
  }
}
