import { Request, Response, NextFunction } from "express";
import { RandomErrorGenerator } from "../../../utils/Tests/randomErrorGenerator";
import { ErrorHandler } from "../../../types/errorHandler";
import logger from "../../../utils/logger"; // Import the logger

export const errorTestController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Received request at /api/test-error"); // Log receiving a request

    RandomErrorGenerator(); // This might throw an error

    res.json({ message: "No error occurred" });
    logger.info("Response sent from /api/test-error"); // Log successful response
  } catch (error) {
    logger.error("Error occurred in errorTestController: %o", error); // Log the error

    if (error instanceof ErrorHandler) {
      next(error);
    } else if (error instanceof Error) {
      next(new ErrorHandler(500, error.message));
    } else {
      next(new ErrorHandler(500, "An unknown error occurred"));
    }
  }
};
