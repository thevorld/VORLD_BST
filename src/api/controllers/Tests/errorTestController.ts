import { Request, Response, NextFunction } from "express";
import { RandomErrorGenerator } from "../../../utils/Tests/randomErrorGenerator";
import {
  ErrorHandler,
  ValidationError,
  NotFoundError,
  DatabaseError,
} from "../../../types/errorHandler";
import logger from "../../../utils/logger";

// Refactored errorTestController with improved error handling
export const errorTestController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Received request at /api/test-error");

    await RandomErrorGenerator();

    res.json({ message: "No error occurred" });
    logger.info("Response sent from /api/test-error");
  } catch (error: unknown) {
    logger.error("Error occurred in errorTestController: %o", error);

    if (error instanceof ErrorHandler) {
      next(error);
    } else {
      const status = error instanceof Error ? 500 : 500;
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      next(new ErrorHandler(status, message));
    }
  }
};
