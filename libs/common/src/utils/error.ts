/**
 * Represents a base error with a message.
 */
interface BaseError {
  message: string;
}

/**
 * Represents an error that occurs due to invalid input.
 */
export class InvalidInputError implements BaseError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

/**
 * Represents a custom error for a "not found" scenario.
 */
export class NotFoundError implements BaseError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

/**
 * Represents an error that occurs when a user is unauthorized.
 */
export class UnauthorizedError implements BaseError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

/**
 * Represents a Forbidden Error.
 */
export class ForbiddenError implements BaseError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

/**
 * Represents an internal server error.
 */
export class InternalServerError implements BaseError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

/**
 * Represents an unknown error.
 */
export class UnknownError implements BaseError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
