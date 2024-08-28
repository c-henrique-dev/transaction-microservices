export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundException extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class BadRequestException extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedException extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
