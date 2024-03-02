import {
  Connection,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '@app/common';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { Channel } from './entity/channel.entity';

@Resolver('ChannelPayload')
export class PayloadResolver {
  @ResolveField()
  __resolveType(obj: any) {
    switch (obj.constructor) {
      case UnauthorizedError:
        return 'UnauthorizedError';
      case NotFoundError:
        return 'NotFoundError';
      case InternalServerError:
        return 'InternalServerError';
      case Channel:
        return 'Channel';
      case Connection<Channel>:
        return 'ChannelConnection';
      default:
        return 'UnknownError';
    }
  }
}
