import { ExecutionContext, Injectable, Logger } from '@nestjs/common';

import { AuthEntity } from '../entity/auth.entity';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedError } from '@app/common';

@Injectable()
export class GqlAuthGuardWithoutThrow extends AuthGuard() {
  private logger = new Logger(GqlAuthGuardWithoutThrow.name);

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  handleRequest<TUser = AuthEntity | UnauthorizedError>(
    err: any,
    user: AuthEntity | null,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      this.logger.error('Unauthorized');

      return new UnauthorizedError(
        'User is not authorized to access this data',
      ) as TUser;
    }

    return user as TUser;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    return result;
  }
}
