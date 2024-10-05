// src/types/errorHandler.d.ts

export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype); // Set the prototype explicitly
  }
}

export class ValidationError extends ErrorHandler {
  constructor(message: string) {
    super(400, message);
  }
}

export class NotFoundError extends ErrorHandler {
  constructor(message: string) {
    super(404, message);
  }
}

export class DatabaseError extends ErrorHandler {
  constructor(message: string) {
    super(500, message);
  }
}
