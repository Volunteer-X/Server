class Resource<T> {
  data?: T;
  success?: boolean;
  message?: string;

  constructor(success: boolean, data?: T, message?: string) {
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

export class Success<T> extends Resource<T> {
  constructor(data: T) {
    super(true, data);
  }
}

export class Failure<T> extends Resource<T> {
  constructor(data: T, message?: string) {
    super(false, data, message);
  }
}
