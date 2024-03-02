import { CursorParams } from './Cursor.interface';
import Joi from 'joi';

export function validateSchema<TParams = CursorParams>(
  param: unknown,
  schema: Joi.ObjectSchema<TParams>,
): TParams {
  const { error, value } = schema.validate(param);

  if (error !== null) {
    const errorMessages =
      error.details != null
        ? error.details.map((detail) => `- ${detail.message}`).join('\n')
        : `- ${error.message}`;
    throw new Error(errorMessages);
  }

  return value;
}
