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

  static wrapWithPagination<R>(T: any): Payload<R> {
    const wrapped = this.wrap<R>(T);

    if (!Array.isArray(wrapped)) return wrapped;

    // Pagination

    // return {
    //   edges: pings.map((ping) => ({
    //     node: ping,
    //     cursor: encodeToBase64(ping.id),
    //   })),
    //   owner: { __typename: 'User', id: userID },
    //   pageInfo: {
    //     hasNextPage: pings.length === first,
    //     endCursor:
    //       pings.length > 0 ? encodeToBase64(pings[pings.length - 1].id) : null,
    //   },
    // };
  }
}
