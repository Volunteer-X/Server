import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { ChannelService } from './channel.service';
import { WrappedPayload } from '@app/common';

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
  async getChannelsByAdmin(@Args('admin') admin: string) {
    const result = await this.channelService.getChannelsByAdmin(admin);
    return WrappedPayload.wrap(result);
  }

  @Query('userChannels')
  async getChannelsByUser(@Args('user') user: string) {
    const result = await this.channelService.getChannelsByUser(user);
    return WrappedPayload.wrap(result);
  }
}
