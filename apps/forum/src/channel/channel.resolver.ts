import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { ChannelService } from './channel.service';
import { WrappedPayload, decodeFromBase64 } from '@app/common';
import { first } from 'rxjs';
import { after } from 'node:test';
import { Channel } from './entity/channel.entity';

@Resolver('Forum')
export class ChannelResolver {
  private readonly logger = new Logger(ChannelResolver.name);
  constructor(private readonly channelService: ChannelService) {}

  @Query('channel')
  async getChannel(@Args('id') id: string) {
    const result = await this.channelService.getChannel(id);
    return WrappedPayload.wrap(result);
  }

  @Query('adminChannels')
  async getChannelsByAdmin(
    @Args('admin') admin: string,
    @Args('first') first: number,
    @Args('after') after: string | undefined,
  ) {
    const result = await this.channelService.getChannelsByAdmin(
      admin,
      first,
      decodeFromBase64(after),
    );

    const wrapperResult = WrappedPayload.wrap<Array<Channel>>(result);
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
