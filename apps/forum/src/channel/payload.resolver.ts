import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '@app/common';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { Channel } from './entity/channel.entity';

@Resolver('ChannelPayload')
export class PayloadResolver {
  @ResolveField()
  __resolveType(obj: any, context, info) {
    switch (obj.constructor) {
      case UnauthorizedError:
        return 'UnauthorizedError';
      case NotFoundError:
        return 'NotFoundError';
      case InternalServerError:
        return 'InternalServerError';
      case Channel:
        return 'Channel';
      default:
        return 'UnknownError';
    }
  }
}
