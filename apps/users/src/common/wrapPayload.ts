import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
} from '../user/graphql/user.schema';

export class WrappedPayload {
  private readonly unAuthorizedError: UnauthorizedError;
  private readonly notFoundError: NotFoundError;
  private readonly internalServerError: InternalServerError;
  private readonly unknownError: UnknownError;

  constructor() {
    this.unAuthorizedError = new UnauthorizedError();
    this.unAuthorizedError.message = 'Unauthorized';

    this.notFoundError = new NotFoundError();
    this.notFoundError.message = 'Not found';

    this.internalServerError = new InternalServerError();
    this.internalServerError.message = 'Internal server error';

    this.unknownError = new UnknownError();
    this.unknownError.message = 'Unknown error';
  }

  wrap(T: any) {
    switch (T.constructor) {
      case UnauthorizedError:
        return this.unAuthorizedError;
      case NotFoundError:
        return this.notFoundError;
      case InternalServerError:
        return this.internalServerError;
      case Object:
        return T;
      default:
        return this.unknownError;
    }
  }
}
