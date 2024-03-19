import { InternalServerError, NotFoundError } from '@app/common';
import { ResolveField, Resolver } from '@nestjs/graphql';

import { Logger } from '@nestjs/common';
import { User } from '@user/entity/user.entity';

@Resolver('UserPayload')
export class PayloadResolver {
  private logger = new Logger(PayloadResolver.name);

  @ResolveField()
  __resolveType(obj: any) {
    this.logger.log(typeof obj);
    switch (obj.constructor) {
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
