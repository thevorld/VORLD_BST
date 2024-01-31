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

