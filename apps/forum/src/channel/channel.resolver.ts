import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { Cursor, WrappedPayload } from '@app/common';
import { Channel } from './entity/channel.entity';

@Resolver('Forum')
export class ChannelResolver {
  private readonly logger = new Logger(ChannelResolver.name);
  constructor(private readonly channelService: ChannelService) {}

  @Query('channel')
  async getChannel(@Args('id') id: string) {
    const result = await this.channelService.getChannel(id);
    return WrappedPayload.wrap<typeof result>(result);
  }

  @Query('adminChannels')
  async getChannelsByAdmin(
    @Args('admin') admin: string,
    @Args('first') first: number,
    @Args('after') after: string,
  ) {
    const decodedCursor = Cursor.fromString(after);

    const result = await this.channelService.getChannelsByAdmin(
      admin,
      first + 1, // Fetch one more than the requested amount to determine if there are more items to fetch.
      decodedCursor,
    );

    if (!Array.isArray(result)) {
      return WrappedPayload.wrap<typeof result>(result);
    }

    const [channels, count] = result;

    return WrappedPayload.wrapWithPagination<Channel>(channels, count, first);
  }

  @Query('userChannels')
  async getChannelsByUser(
    @Args('user') user: string,
    @Args('first') first: number,
    @Args('after') after: string,
  ) {
    const decodedCursor = Cursor.fromString(after);

    const result = await this.channelService.getChannelsByUser(
      user,
      first + 1,
      decodedCursor,
    );

    if (!Array.isArray(result)) {
      return WrappedPayload.wrap<typeof result>(result);
    }

    const [channels, count] = result;

    return WrappedPayload.wrapWithPagination<Channel>(channels, count, first);
  }
}
