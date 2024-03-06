import { Cursor } from './cursor';

describe('Cursor', () => {
  it('should instantiate Cursor with valid parameters', () => {
    const params = { id: '123' };
    const cursor = new Cursor(params);

    expect(cursor.parameters).toEqual(params);
  });

  it('should return a stringified version of the parameters when toString method is called', () => {
    const params = { id: '123' };
    const cursor = new Cursor(params);

    const result = cursor.toString();

    expect(result).toEqual(JSON.stringify(params));
  });

  it('should return a base64 encoded string of the parameters when encode method is called', () => {
    const params = { id: '65e6df249199a1be94471dfb' };
    const cursor = new Cursor(params);

    const encodedString = cursor.encode();

    expect(encodedString).toEqual(
      Buffer.from(JSON.stringify(params)).toString('base64'),
    );
  });

  it('should decode a base64 encoded string and return a Cursor object with valid parameters', () => {
    const encodedString = 'eyJpZCI6IjEyMyJ9';
    const expectedParams = { id: '123' };

    const cursor = Cursor.fromString(encodedString);

    expect(cursor.parameters).toEqual(expectedParams);
  });

  it('should handle empty strings as input when calling fromString method', () => {
    const encodedString = '';
    const cursor = Cursor.fromString(encodedString);

    expect(cursor).toBeNull();
  });

  it('should return true when given a valid encoded cursor string', () => {
    const validCursor = new Cursor({ id: '65e6db49718cf25e29ffeb54' });
    const encodedString = validCursor.encode();
    const result = Cursor.isCursor(encodedString);
    expect(result).toBe(true);
  });

  it('should return false when given a string that is not a valid base64 encoding', () => {
    const invalidCursor = new Cursor({ id: 'invalid' });
    const invalidEncodedString = invalidCursor.encode();
    const result = Cursor.isCursor(invalidEncodedString);
    expect(result).toBe(false);
  });
});
