import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../types/errorHandler'; // Update the import path

export const customErrorHandler = (err: Error | ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    console.error(err); // Log the original error
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};