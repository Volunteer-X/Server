import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
} from './error';

import { Payload } from './entity';

export class WrappedPayload {
  static wrap(T: any): Payload<typeof T> {
    switch (T.constructor) {
      case UnauthorizedError:
        return new UnauthorizedError(T.message);
      case NotFoundError:
        return new NotFoundError(T.message);
      case InternalServerError:
        return new InternalServerError(T.message);
      case Object:
        return T;
      default:
        return new UnknownError('Unknown error');
    }
  }
}
