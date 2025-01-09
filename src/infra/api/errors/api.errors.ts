import { IError } from "./interfaces/IError";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly error?: IError;
  constructor(message: string, statusCode: number, error?: IError) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, error?: IError) {
    super(message, 404, error);
  }
}
export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
