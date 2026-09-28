import mongoose from "mongoose";
import { redis } from "../redis/redis.js";
import logger from "../utils/logger.js";

export default function gracefulShutdown(
  server
) {
  async function shutdown(signal) {
    logger.info(`${signal} received`);

    await mongoose.connection.close();

    if (redis) {
      await redis.quit();
    }

    server.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });
  }

  process.on("SIGINT", () =>
    shutdown("SIGINT")
  );

  process.on("SIGTERM", () =>
    shutdown("SIGTERM")
  );
}