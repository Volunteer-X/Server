import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
} from './error';

import { Payload } from './entity';

export class WrappedPayload {
  private static isNotNull = (val: any) => val !== null;
  private static isNotUndefined = (val: any) => val !== undefined;
  static wrap<R>(T: any): Payload<R> {
    if (!T || T === null) return new UnknownError('Unknown error');

    switch (T.constructor) {
      case UnauthorizedError:
        return new UnauthorizedError(T.message);
      case NotFoundError:
        return new NotFoundError(T.message);
      case InternalServerError:
        return new InternalServerError(T.message);
      case Object:
        return T;
      case Array:
        const filteredItems = (T as Array<any>)
          .filter(this.isNotNull)
          .filter(this.isNotUndefined);

        if (!filteredItems.length) return new NotFoundError('Not found');

        return filteredItems;
      default:
        return new UnknownError('Unknown error');
    }
  }

  // static wrap(T: any[] | any): Payload<typeof T> {
  //   if (Array.isArray(T)) {
  //     return T.map((t) => WrappedPayload.wrapper(t)) as Payload<typeof T>;
  //   }
  //   return WrappedPayload.wrapper(T);
  // }
}
