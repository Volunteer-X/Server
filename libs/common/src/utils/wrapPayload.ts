import { Connection, ConnectionBuilder, CursorParams } from '../pagination';
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
} from './error';

import { Payload } from './entity';

/**
 * Represents a utility class for wrapping payloads.
 */
export class WrappedPayload {
  private static isNotNull = (val: any) => val !== null;
  private static isNotUndefined = (val: any) => val !== undefined;
  /**
   * Wraps the payload based on its type.
   *
   * @template R - The type of the payload.
   * @param {any} T - The payload to be wrapped.
   * @returns {Payload<R>} - The wrapped payload.
   */
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

  /**
   * Wraps the given result array with pagination information.
   * If the totalCount is not a number, it wraps the totalCount in a Payload object.
   * Otherwise, it creates a Connection object using the ConnectionBuilder class.
   *
   * @template R - The type of the result array.
   * @param {R[]} result - The result array to be wrapped.
   * @param {Payload<number>} totalCount - The total count of items.
   * @param {number} first - The number of items per page.
   * @returns {Payload<number> | Connection<R>} - The wrapped result.
   */
  static wrapWithPagination<R extends CursorParams>(
    result: R[],
    totalCount: Payload<number>,
    first: number,
  ): Payload<number> | Connection<R> {
    if (typeof totalCount !== 'number') {
      return WrappedPayload.wrap<number>(totalCount);
    }

    const hasNextPage = result.length > first;

    const slicedResult = hasNextPage ? result.slice(0, -1) : result;

    const connection = new ConnectionBuilder<R>()
      .setHasNextPage(hasNextPage)
      .setTotalCount(totalCount)
      .setEdges(slicedResult)
      .setEndCursor(slicedResult)
      .build();

    return connection;
  }
}
