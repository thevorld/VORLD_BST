import mongoose from "mongoose";
import logger from "../utils/logger";

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

const connectMongoDB = async (retryCount = 0) => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
    await mongoose.connect(mongoURI);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    if (retryCount < MAX_RETRIES) {
      logger.info(`Retrying connection in ${RETRY_INTERVAL / 1000} seconds...`);
      setTimeout(() => connectMongoDB(retryCount + 1), RETRY_INTERVAL);
    } else {
      logger.error("Max retries reached. Exiting...");
      process.exit(1);
    }
  }
};

export default connectMongoDB;
