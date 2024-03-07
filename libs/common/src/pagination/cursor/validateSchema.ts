import { CursorParams } from './Cursor.interface';
import Joi from 'joi';

export function validateSchema<TParams = CursorParams>(
  param: unknown,
  schema: Joi.ObjectSchema<TParams>,
): TParams {
  const { error, value } = schema.validate(param);

  if (error) {
    console.log('error', error);

    throw new Error('Invalid cursor');
  }

  return value;
}
