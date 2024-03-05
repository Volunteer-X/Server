import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

import { Cursor } from './cursor';

export const GraphQLCursor = new GraphQLScalarType<string, string>({
  name: 'Cursor',
  description:
    'Cursor for pagination: Base64 encoded JSON object with an id property of type string',
  serialize(value: string) {
    if (typeof value !== 'string') {
      throw new GraphQLError('GraphQLCursor can only serialize string');
    }
    if (!Cursor.isCursor(value)) {
      throw new GraphQLError('Invalid base64 encoded cursor');
    }

    return value;
  },
  parseValue(value: string) {
    if (typeof value !== 'string') {
      throw new GraphQLError('GraphQLCursor can only parse string');
    }
    if (!Cursor.isCursor(value)) {
      throw new GraphQLError('Invalid base64 encoded cursor');
    }
    return value;
  },
  parseLiteral(ast): string {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('GraphQLCursor can only parse string literals');
    }
    if (!Cursor.isCursor(ast.value)) {
      throw new GraphQLError('Invalid base64 encoded cursor');
    }
    return ast.value;
  },
});
