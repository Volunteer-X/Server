import { Connection, ConnectionBuilder, CursorParams } from '../pagination';
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

  static wrapWithPagination<R extends CursorParams>(
    result: R[],
    count: Payload<number>,
    first: number,
  ): Payload<number> | Connection<R> {
    if (typeof count !== 'number') {
      return WrappedPayload.wrap<number>(count);
    }

    const connection = new ConnectionBuilder<R>()
      .setEdges(result)
      .setTotalCount(count)
      .setHasNextPage(count, first)
      .setEndCursor(result)
      .build();

    return connection;
  }
}
