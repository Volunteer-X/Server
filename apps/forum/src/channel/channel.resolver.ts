import { Query, Resolver } from '@nestjs/graphql';

@Resolver('forum')
export class ChannelResolver {
  @Query('forums')
  async getForum() {
    return 'Hello World';
  }
}
