import app from "./app.js";
import connectRedis from "./redis/redis.js";
import logger from "./utils/logger.js";
import gracefulShutdown from "./config/shutdown.js";
import env from "./config/env.js";
import './workers/index.js';
import connectDB from "./database/mongodb.js";


async function bootstrap() {
  await connectDB();
  await connectRedis();

  const server = app.listen(
    env.PORT,
    () => {
      logger.info(
        `Server running on ${env.PORT}`
      );
    }
  );

  gracefulShutdown(server);
}

bootstrap().catch(error => {
  logger.error(error);
  process.exit(1);
});