import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { json } from "body-parser";
import pingRouter from "./api/routes/ping";
import healthCheckRouter from "./api/routes/healthCheck";
import userRouter from "./api/routes/user";
import { customErrorHandler } from "./api/middlewares/errorHandler";
import { apiLimiter } from "./config/rateLimiter";
import dotenv from "dotenv-safe";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import readinessCheckRouter from "./api/routes/readinessCheck";
import connectMongoDB from "./config/mongoConfig";
import { connectSQLDB, sequelize } from "./config/sqlConfig";
import mongoose from "mongoose";

dotenv.config({
  example: ".env.example",
  allowEmptyValues: false,
});

// Validate critical environment variables
const requiredEnvVars = ["NODE_ENV", "PORT", "USE_MONGO_DB", "USE_SQL_DB"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

const app: Application = express();

// Basic Security with Helmet
app.use(helmet());

// Enable CORS
const corsOptions = {
  origin: ["https://thevorld.com", "http://localhost:3000"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Compress responses
app.use(compression());

// Rate Limiting
app.use(apiLimiter);

// Body Parser Middleware
app.use(json());

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/liveness_check", healthCheckRouter);
app.use("/api/user", userRouter);
app.use("/api/readiness_check", readinessCheckRouter);

// Error Handling Middleware
app.use(customErrorHandler);

// Connect to databases based on environment variables
if (process.env.USE_MONGO_DB === "true") {
  connectMongoDB();
}

if (process.env.USE_SQL_DB === "true") {
  connectSQLDB();
}

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

const gracefulShutdown = () => {
  console.log("Received kill signal, shutting down gracefully...");
  server.close(async () => {
    console.log("Closed out remaining connections.");
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
    }
    if (sequelize) {
      await sequelize.close();
      console.log("SQL connection closed.");
    }
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

export default app;
