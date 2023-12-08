import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PingService } from './ping.service';
import { CreatePingInput, Ping, UPingInput } from './graphql/ping.schema';
import { Logger } from '@nestjs/common';

@Resolver('Ping')
export class PingResolver {
  constructor(private readonly pingService: PingService) {}
  private readonly logger = new Logger(PingResolver.name);

  @Mutation('createPing')
  create(@Args('payload') payload: CreatePingInput) {
    return this.pingService.createPing(payload);
  }

  @Mutation('updatePing')
  updateMedia(@Args('id') id: string, @Args('payload') payload: UPingInput) {
    return this.pingService.updatePing(id, payload);
  }

  @ResolveField('user')
  user(@Parent() ping: Ping) {
    this.logger.log('ping', ping.userID);
    return { __typename: 'User', id: ping.userID };
  }
}
