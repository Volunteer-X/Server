import { StringifiableRecord } from 'query-string';

export type CursorParams = {
  id: string;
};

export interface ICursor<
  TParams extends StringifiableRecord = StringifiableRecord,
> {
  parameters: TParams;

  toString(): string;

  encode(): string;
}
