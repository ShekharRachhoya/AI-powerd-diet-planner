import mongoose from "mongoose";
import logger from "../utils/logger.js";

export default async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);

  logger.info("MongoDB connected");
}