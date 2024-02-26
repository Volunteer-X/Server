import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnknownError,
} from '../error';

export type Payload<T> =
  | T
  | UnauthorizedError
  | NotFoundError
  | InternalServerError
  | UnknownError;
