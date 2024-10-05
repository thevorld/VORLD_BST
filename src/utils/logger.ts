import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Loggly } from "winston-loggly-bulk";

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
    new Loggly({
      token: process.env.LOGGLY_TOKEN!,
      subdomain: process.env.LOGGLY_SUBDOMAIN!,
      tags: ["Winston-NodeJS", process.env.NODE_ENV || "development"],
      json: true,
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

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown:", error);
  // Application specific logging, throwing an error, or other logic here
  process.exit(1); // Exit the process to avoid unknown states
});
