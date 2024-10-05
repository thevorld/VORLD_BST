import { Request, Response, NextFunction } from "express";
import {
  ErrorHandler,
  ValidationError,
  NotFoundError,
  DatabaseError,
} from "../../types/errorHandler"; // Update the import path
import logger from "../../utils/logger"; // Import the logger

export const customErrorHandler = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof NotFoundError) {
    statusCode = 404;
    message = err.message;
  } else if (err instanceof DatabaseError) {
    statusCode = 500;
    message = err.message;
  } else {
    logger.error(err); // Log the original error using logger
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
