import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { sequelize } from "../../config/sqlConfig";
import logger from "../../utils/logger";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const mongoReady =
      process.env.USE_MONGO_DB === "true"
        ? mongoose.connection.readyState === 1
        : true;
    const sqlReady =
      process.env.USE_SQL_DB === "true"
        ? await sequelize
            .authenticate()
            .then(() => true)
            .catch(() => false)
        : true;

    if (mongoReady && sqlReady) {
      res.status(200).json({
        status: "Ready",
        message: "Server is ready to handle requests",
      });
    } else {
      res.status(503).json({
        status: "Not Ready",
        message: "Server is not ready",
        mongoReady,
        sqlReady,
      });
    }
  } catch (error: unknown) {
    logger.error("Error in readiness check:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(503).json({
      status: "Not Ready",
      message: "Server encountered an error during readiness check",
      error: errorMessage,
    });
  }
});

export default router;
