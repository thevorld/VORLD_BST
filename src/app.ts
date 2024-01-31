import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";
import pingRouter from "./api/routes/ping";
import { customErrorHandler } from "./api/middlewares/errorHandler";
import errorTestRoutes from "./api/routes/Tests/errorTestRoutes";

require("dotenv").config();

const app: Application = express();

// Basic Security with Helmet
app.use(helmet());

// Enable CORS
app.use(cors());

// Compress responses
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body Parser Middleware
app.use(json());

// Routes
app.use("/api/liveness_check", pingRouter);
app.use("/api/test-error", errorTestRoutes);

// Error Handling Middleware
app.use(customErrorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
