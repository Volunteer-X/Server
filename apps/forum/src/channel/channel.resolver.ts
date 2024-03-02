import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { Cursor, NotFoundError, WrappedPayload } from '@app/common';
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
    @Args('after') after: string | undefined,
  ) {
    this.logger.log(
      `adminChannels: admin=${typeof admin}, first=${first}, after=${after}`,
    );

    const result = await this.channelService.getChannelsByAdmin(
      admin,
      first,
      Cursor.decode(after),
    );

    if (!Array.isArray(result)) {
      const wrapperResult = WrappedPayload.wrap<typeof result>(result);
      return wrapperResult;
    }

    const count = await this.channelService.getTotalCount(admin);

    console.log('count', count);

    return new NotFoundError('Not found');

    // return WrappedPayload.wrapWithPagination<Channel>(result, count, first);
  }

  @Query('userChannels')
  async getChannelsByUser(
    @Args('user') user: string,
    @Args('first') first: number,
    @Args('after') after: string | undefined,
  ) {
    const result = await this.channelService.getChannelsByUser(
      user,
      first,
      after,
    );
    return WrappedPayload.wrap(result);
  }
}
