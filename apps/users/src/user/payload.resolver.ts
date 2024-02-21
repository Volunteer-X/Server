import { NotFoundError, UnauthorizedError } from './graphql/user.schema';
import { ResolveField, Resolver } from '@nestjs/graphql';

import { Logger } from '@nestjs/common';

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
      default:
        return 'User';
    }
  }
}
