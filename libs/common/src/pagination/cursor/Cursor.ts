import { CursorParams, ICursor } from './Cursor.interface';

export class Cursor<TParams extends CursorParams> implements ICursor {
  constructor(public parameters: TParams) {}

  public toString(): string {
    return JSON.stringify(this.parameters);
  }
  public encode(): string {
    return Buffer.from(this.toString()).toString('base64');
  }

  static decode(encodedString?: string): CursorParams {
    return JSON.parse(Buffer.from(encodedString, 'base64').toString());
  }

  public static fromString<TParams extends CursorParams = CursorParams>(
    encodedString: string,
  ): Cursor<TParams> | null {
    if (!encodedString || encodedString === null) return null;

    const params = Cursor.decode(encodedString);

    // const schema = Joi.object<TParams>({
    //   id: Joi.string().empty('').required(),
    // }).unknown(true);

    // const validatedParams = validateSchema(params, schema);
    return new Cursor<TParams>(params as TParams);
  }

  public static isCursor(value: string): boolean {
    try {
      const decoded = Cursor.decode(value);
      return (
        typeof decoded === 'object' &&
        decoded !== null &&
        typeof decoded.id === 'string'
      );
    } catch (e) {
      return false;
    }
  }
}
