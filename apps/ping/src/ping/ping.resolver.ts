import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PingService } from './ping.service';
import { CreatePingInput, Media, UpdatePingInput } from './graphql/ping.schema';

@Resolver('Ping')
export class PingResolver {
  constructor(private readonly pingService: PingService) {}

  @Mutation('createPing')
  create(@Args('createPingInput') input: CreatePingInput) {
    return this.pingService.createPing(input);
  }

  @Mutation('updateMedia')
  updateMedia(@Args('updatePingInput') input: UpdatePingInput) {
    return this.pingService.updatePing(input);
  }
}
