import { ExecutionContext, Injectable, Logger } from '@nestjs/common';

import { AuthEntity } from '../entity/auth.entity';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { UnauthorizedError } from '@app/common';

@Injectable()
export class GqlAuthGuard extends AuthGuard() {
  private logger = new Logger(GqlAuthGuard.name);

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  handleRequest<TUser = AuthEntity>(
    err: any,
    user: TUser,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      this.logger.error('Unauthorized');
      throw (
        err ||
        new UnauthorizedError('User is not authorized to access this data')
      );
    }

    return user as TUser;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('getHandler', context);
    const result = super.canActivate(context) as boolean;
    return result;
  }
}
