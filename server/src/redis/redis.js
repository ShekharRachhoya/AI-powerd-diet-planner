import Redis from "ioredis";
import logger from "../utils/logger.js";

let redis;

export default async function connectRedis() {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  });

  redis.on("connect", () => {
    logger.info("Redis connected");
  });

  return redis;
}

export { redis };