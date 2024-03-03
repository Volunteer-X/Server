import { CreateChannelDto, UpdateChannelDto } from './dto';
import {
  Cursor,
  Failure,
  InternalServerError,
  NotFoundError,
  Success,
} from '@app/common';

import { Channel } from './entity/channel.entity';
import { CursorParams } from '@app/common/pagination/cursor/Cursor.interface';
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
      // console.log('Failed to create channel', error);

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
      return new NotFoundError('Channel not found');
    }
  }

  async getChannelsByUser(user: string, first: number, after?: string) {
    const cursor = after ? { id: after } : undefined;

    try {
      const result = await this.channelRepository.findMany({
        where: {
          AND: {
            participants: {
              has: user,
            },
            AND: {
              participants: {
                isEmpty: false,
              },
            },
          },
        },
        include: {
          messages: {
            orderBy: {
              id: 'desc',
            },
            take: 1,
          },
        },
        skip: 1,
        take: first,
        cursor,
        orderBy: {
          id: 'desc',
        },
      });

      if (!result.length)
        return new NotFoundError('No Channel under this user id found');

      return result.map(Channel.ToEntityFromPrisma);
    } catch (error) {
      return new InternalServerError('Failed to get channels');
    }
  }
  async getChannelsByAdmin(
    admin: string,
    first: number,
    after?: Cursor<CursorParams>,
  ) {
    const cursor = after ? after.parameters : undefined;

    try {
      const [result, totalCount] = await this.repository.$transaction([
        this.repository.channel.findMany({
          where: {
            admin,
          },
          include: {
            messages: {
              orderBy: {
                id: 'desc',
              },
              take: 1,
            },
          },
          skip: cursor ? 1 : 0,
          take: first,
          cursor,
          orderBy: {
            id: 'asc',
          },
        }),
        this.repository.channel.count({
          where: {
            admin,
          },
        }),
      ]);

      if (!result.length || !totalCount)
        return new NotFoundError('No Channel under this user id found');

      return [Channel.ToEntityFromPrismaArray(result), totalCount] as [
        Channel[],
        number,
      ];
    } catch (error) {
      return new InternalServerError('Failed to get channels');
    }
  }
}
