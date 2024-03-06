import { Cursor } from './cursor';
import { GraphQLCursor } from './GraphQLCursor';
import { Kind } from 'graphql';

describe('GraphQLError', () => {
  it('should serialize a valid cursor string when given a valid cursor', () => {
    const validCursor = new Cursor({ id: '65e6db49718cf25e29ffeb54' });
    const encodedValidCursor = validCursor.encode();

    console.log('encodedValidCursor', encodedValidCursor);

    expect(() => {
      GraphQLCursor.serialize(encodedValidCursor);
    }).not.toThrow();
  });
  it('should throw and error when serializing a cursor without a valid ObjectId', () => {
    const invalidCursor = new Cursor({ id: 'invalid' });
    const encodedInvalidCursor = invalidCursor.encode();

    expect(() => {
      GraphQLCursor.serialize(encodedInvalidCursor);
    }).toThrow('Invalid base64 encoded cursor');
  });
  it('should throw an error when serializing an invalid cursor string', () => {
    const invalidCursor = 'invalid';
    expect(() => {
      GraphQLCursor.serialize(invalidCursor);
    }).toThrow('Invalid base64 encoded cursor');
  });

  it('should parse a valid cursor string when given a valid cursor', () => {
    const validCursor =
      'eyJpZCI6IjY1ZTZkZjI0OTE5OWExYmU5NDQ3MWRmYiIsInRpdGxlIjoidGVzdCIsImRhdGEiOiJkYXRhIn0=';
    expect(() => {
      GraphQLCursor.parseValue(validCursor);
    }).not.toThrow();
  });

  it('should parse a valid cursor string literal when given a valid cursor', () => {
    const validCursor =
      'eyJpZCI6IjY1ZTZkZjI0OTE5OWExYmU5NDQ3MWRmYiIsInRpdGxlIjoidGVzdCIsImRhdGEiOiJkYXRhIn0=';
    expect(() => {
      GraphQLCursor.parseLiteral({ kind: Kind.STRING, value: validCursor });
    }).not.toThrow();
  });
  it('should throw an error when serializing a non-string value', () => {
    const nonStringValue = 123;
    expect(() => {
      GraphQLCursor.serialize(nonStringValue);
    }).toThrow('GraphQLCursor can only serialize string');
  });
  it('should throw an error when parsing a non-string value', () => {
    const nonStringValue = 123;
    expect(() => {
      GraphQLCursor.parseValue(nonStringValue);
    }).toThrow('GraphQLCursor can only parse string');
  });
  it('should throw an error when parsing an invalid cursor string literal', () => {
    const invalidCursor = 'invalidCursor';
    expect(() => {
      GraphQLCursor.parseLiteral({ kind: Kind.STRING, value: invalidCursor });
    }).toThrow('Invalid base64 encoded cursor');
  });
  it('should handle empty string values when parsing', () => {
    const emptyString = '';
    expect(() => {
      GraphQLCursor.parseValue(emptyString);
    }).toThrow();
  });
  it('should handle missing id property when decoding', () => {
    const invalidCursor = 'eyJ0aXRsZSI6InRlc3QiLCJkYXRhIjoiZGF0YSJ9';
    expect(() => {
      GraphQLCursor.parseValue(invalidCursor);
    }).toThrow('Invalid base64 encoded cursor');
  });
});
