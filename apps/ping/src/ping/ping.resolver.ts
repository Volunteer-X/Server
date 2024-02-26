import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { PingService } from './ping.service';
import {
  CreatePingInput,
  Ping,
  UPingInput,
  UPingsWithinRadiusInput,
} from './graphql/ping.schema';
import { Logger, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@app/auth';
import { User } from '@app/common/utils/entity/entities';
import { decodeFromBase64, encodeToBase64 } from '@app/common/utils/helpers';

@Resolver('Ping')
export class PingResolver {
  constructor(private readonly pingService: PingService) {}
  private readonly logger = new Logger(PingResolver.name);

  @Mutation('createPing')
  @UseGuards(GqlAuthGuard)
  create(@Args('payload') payload: CreatePingInput) {
    return this.pingService.createPing(payload);
  }

  @Mutation('updatePing')
  updateMedia(@Args('id') id: string, @Args('payload') payload: UPingInput) {
    return this.pingService.updatePing(id, payload);
  }

  @Query('getPing')
  @UseGuards(GqlAuthGuard)
  getPing(@Args('id') id: string, @CurrentUser() user: User) {
    return this.pingService.getPing(id, user.id);
  }

  @Query('getAllPing')
  @UseGuards(GqlAuthGuard)
  async getAllPing(
    @CurrentUser() user: User,
    @Args('first') first: number,
    @Args('after') after: string,
    @Args('userID') userID?: string,
  ) {
    userID = userID ? userID : user.id;

    const pings = await this.pingService.getAllPing(
      userID,
      first,
      decodeFromBase64(after),
    );

    return {
      edges: pings.map((ping) => ({
        node: ping,
        cursor: encodeToBase64(ping.id),
      })),
      owner: { __typename: 'User', id: userID },
      pageInfo: {
        hasNextPage: pings.length === first,
        endCursor:
          pings.length > 0 ? encodeToBase64(pings[pings.length - 1].id) : null,
      },
    };
  }

  @Query('getPingsWithinRadius')
  @UseGuards(GqlAuthGuard)
  async getPingsWithinRadius(
    @Args('payload') payload: UPingsWithinRadiusInput,
    @Args('first') first: number,
    @Args('after') after: string,
    @Args('picks') picks: string[] | undefined,
    @CurrentUser() user,
  ) {
    this.logger.log('userID', user.id);

    const { pings, totalCount } = await this.pingService.getPingsWithinRadius(
      payload,
      first,
      decodeFromBase64(after),
      picks,
      user.id,
    );

    return {
      totalCount,
      edges: pings.map((ping) => ({
        node: ping,
        cursor: encodeToBase64(ping.id),
      })),
      owner: null,
      pageInfo: {
        hasNextPage: pings.length === first,
        endCursor:
          pings.length > 0 ? encodeToBase64(pings[pings.length - 1].id) : null,
      },
    };
  }

  @Query('getParticipants')
  @UseGuards(GqlAuthGuard)
  async getParticipants(
    @Args('pingID') pingID: string,
    @Args('first') first: number,
    @Args('after') after: string,
  ) {
    const { members, totalCount } = await this.pingService.getParticipants(
      pingID,
      first,
      after,
    );

    return {
      totalCount,
      members,
    };
  }

  @Mutation('addParticipant')
  @UseGuards(GqlAuthGuard)
  async addParticipant(@Args('id') id: string, @Args('userID') userID: string) {
    return await this.pingService.addParticipant(id, userID);
  }

  @Mutation('removeParticipant')
  @UseGuards(GqlAuthGuard)
  async removeParticipant(
    @Args('id') id: string,
    @Args('userID') userID: string,
  ) {
    return await this.pingService.removeParticipant(id, userID);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    first: number;
    after: string;
    userID: string;
  }) {
    const { __typename, after, first, userID } = reference;

    const pings = await this.pingService.getAllPing(
      userID,
      first,
      decodeFromBase64(after),
    );

    return {
      edges: pings.map((ping) => ({
        node: ping,
        cursor: encodeToBase64(ping.id),
      })),
      pageInfo: {
        hasNextPage: pings.length === first,
        endCursor:
          pings.length > 0 ? encodeToBase64(pings[pings.length - 1].id) : null,
      },
    };
  }

  @ResolveField('user')
  user(@Parent() ping: Ping) {
    this.logger.log('ping', ping.userID);
    return { __typename: 'User', id: ping.userID };
  }
}
