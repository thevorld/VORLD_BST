// src/utils/logger.ts
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

require("dotenv").config();

const format = winston.format;
const logDir = "logs"; // Directory for storing logs

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Daily rotation for error logs
    new DailyRotateFile({
      filename: `${logDir}/error-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d",
    }),
    // Daily rotation for info logs
    new DailyRotateFile({
      filename: `${logDir}/info-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      level: "info",
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],
});

// Console transport for non-production environments
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: "debug", // Adjust this level as necessary
    })
  );
}

export default logger;
