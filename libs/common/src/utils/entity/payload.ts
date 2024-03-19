import { InternalServerError, NotFoundError, UnknownError } from '../error';

export type Payload<T> =
  | T[]
  | T
  | NotFoundError
  | InternalServerError
  | UnknownError;
