import { ExecutionContext, Injectable, Logger } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedError } from 'apps/users/src/user/graphql/user.schema';
import { User } from 'libs/utils/entities';

@Injectable()
export class GqlAuthGuard extends AuthGuard() {
  private logger = new Logger(GqlAuthGuard.name);

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  handleRequest<TUser = any>(
    err: any,
    user: User,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      this.logger.log(`err: ${err}`);
      return new UnauthorizedError() as TUser;
    }

    this.logger.log(`user: ${user}`);

    return user as TUser;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    this.logger.log(`canActivate: ${result}`);

    return result;
  }
}
