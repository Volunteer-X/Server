import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PingService } from './ping.service';
import { CreatePingInput, Media } from './graphql/ping.schema';

@Resolver('Ping')
export class PingResolver {
  constructor(private readonly pingService: PingService) {}

  @Mutation('createPing')
  create(@Args('createPingInput') input: CreatePingInput) {
    return this.pingService.createPing(input);
  }

  @Mutation('updateMedia')
  updateMedia(
    @Args('pingID') pingID: string,
    @Args('media') media: Array<Media>,
  ) {
    return this.pingService.updateMedia(pingID, media);
  }
}
