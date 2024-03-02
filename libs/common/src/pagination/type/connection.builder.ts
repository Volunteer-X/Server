import { Connection } from './connection';
import { Cursor } from '../cursor';
import Joi from 'joi';
import { validateSchema } from '../cursor/validateSchema';

interface Builder<T> {
  setHasNextPage(length: number, first: number): this;
  setEndCursor(encodedString: string): this;
  setEdges(nodes: T[]): this;
}

export class ConnectionBuilder<T> implements Builder<T> {
  private connection: Connection<T>;

  constructor() {
    this.connection = new Connection();
  }
  setEdges(nodes: T[]): this {
    throw new Error('Method not implemented.');
  }
  setHasNextPage(length: number, first: number): this {
    this.connection.pageInfo.hasNextPage = length === first;
    return this;
  }
  setEndCursor(encodedString: string): this {
    const schema: Joi.ObjectSchema<{ id: string }> = Joi.object({
      id: Joi.string().empty('').required(),
    }).unknown(false);

    const cursor = Cursor.fromString(encodedString, (params) =>
      validateSchema(params, schema),
    );
    this.connection.pageInfo.endCursor = cursor.toString();
    return this;
  }

  build(): Connection<T> {
    return this.connection;
  }
}
