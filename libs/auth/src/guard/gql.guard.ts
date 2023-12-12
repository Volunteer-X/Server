import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard() {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    // console.log('ctx', ctx.getContext().req?.get('authorization'));

    return ctx.getContext().req;
  }

  // handleRequest<TUser = any>(
  //   err: any,
  //   user: any,
  //   info: any,
  //   context: ExecutionContext,
  //   status?: any,
  // ): TUser {
  //   console.error('err', err);
  //   console.log('user', user);
  //   console.info('info', info);
  //   console.log('context', context);
  //   console.log('status', status);

  //   return super.handleRequest(err, user, info, context, status);
  // }
}
