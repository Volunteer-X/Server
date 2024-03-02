import { CursorParams, ICursor } from './Cursor.interface';

export class Cursor<TParams extends CursorParams> implements ICursor {
  constructor(public parameters: TParams) {}

  public toString(): string {
    return JSON.stringify(this.parameters);
  }
  encode(): string {
    throw Buffer.from(this.toString()).toString('base64');
  }

  public static decode(encodedString: string) {
    return JSON.parse(Buffer.from(encodedString, 'base64').toString());
  }

  public static fromString<TParams extends CursorParams = CursorParams>(
    encodedString: string,
    validateParams?: (params: unknown) => TParams,
  ): Cursor<TParams> {
    const params = Cursor.decode(encodedString);

    if (validateParams) {
      return new Cursor(validateParams(params));
    }

    return new Cursor<TParams>(params as TParams);
  }
}
