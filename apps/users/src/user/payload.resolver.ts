import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '@app/common';
import { ResolveField, Resolver } from '@nestjs/graphql';

import { Logger } from '@nestjs/common';
import { User } from '@user/entity/user.entity';

@Resolver('UserPayload')
export class PayloadResolver {
  private logger = new Logger(PayloadResolver.name);

  @ResolveField()
  __resolveType(obj, context, info) {
    // if (obj instanceof NotFoundError) {
    //   return 'NotFoundError';
    // }
    switch (obj.constructor) {
      case UnauthorizedError:
        return 'UnauthorizedError';
      case NotFoundError:
        return 'NotFoundError';
      case InternalServerError:
        return 'InternalServerError';
      case User:
        return 'User';
      default:
        return 'UnknownError';
    }
  }
}
