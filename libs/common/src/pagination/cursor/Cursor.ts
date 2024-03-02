import { CursorParams, ICursor } from './Cursor.interface';

import Joi from 'joi';
import { validateSchema } from './validateSchema';

export class Cursor<TParams extends CursorParams> implements ICursor {
  constructor(public parameters: TParams) {}

  public toString(): string {
    return JSON.stringify(this.parameters);
  }
  public encode(): string {
    return Buffer.from(this.toString()).toString('base64');
  }

  public static decode(encodedString?: string): CursorParams | undefined {
    return (
      encodedString &&
      JSON.parse(Buffer.from(encodedString, 'base64').toString())
    );
  }

  public static fromString<TParams extends CursorParams = CursorParams>(
    encodedString: string,
  ): Cursor<TParams> {
    const params = Cursor.decode(encodedString);

    const schema = Joi.object<TParams>({
      id: Joi.string().empty('').required(),
    }).unknown(true);

    return new Cursor<TParams>(validateSchema(params, schema) as TParams);
  }
}
