import { NotFoundError, UnauthorizedError, UnknownError } from './error';

import { WrappedPayload } from './wrapPayload';

describe('wrapPayload', () => {
  it("should return the same object when it's not an error", () => {
    const payload = { data: 'test' };
    const result = WrappedPayload.wrap(payload);
    expect(result).toEqual(payload);
  });

  it('should handle null input', () => {
    const result = WrappedPayload.wrap(null);
    expect(result).toEqual({ message: 'Unknown error' });
    expect(result).toBeInstanceOf(UnknownError);
  });

  it('should wrap an UnauthorizedError object correctly', () => {
    const error = new UnauthorizedError('Unauthorized');
    const result = WrappedPayload.wrap(error);
    expect(result).toEqual(error);
  });

  it('should return an UnknownError when input is undefined', () => {
    const result = WrappedPayload.wrap(undefined);
    expect(result).toEqual(new UnknownError('Unknown error'));
  });

  it('should return an empty array when input is an empty array', () => {
    const input = [];
    const result = WrappedPayload.wrap(input);
    expect(result).toBeInstanceOf(NotFoundError);
  });

  it('should return NotFoundError when the input array contains null elements', () => {
    const payload = [null, null, null];
    const result = WrappedPayload.wrap(payload);
    expect(result).toEqual(new NotFoundError('Not found'));
    expect(result).toBeInstanceOf(NotFoundError);
  });

  it('should return an array of wrapped objects when given an array of objects', () => {
    const payload = [{ data: 'test' }, { data: 'test2' }];
    const result = WrappedPayload.wrap(payload);
    expect(result).toEqual([{ data: 'test' }, { data: 'test2' }]);
  });

  it('should return an array of UnknownError when the input array contains empty elements', () => {
    const input = [null, undefined, { data: 'test' }];
    const result = WrappedPayload.wrap(input);
    const expected = [{ data: 'test' }];
    expect(result).toEqual(expected);
  });
});
