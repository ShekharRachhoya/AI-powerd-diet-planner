import redis
from '../config/redis.js';

export default async function redisHealth() {
  try {
    const pong =
      await redis.ping();

    return {
      healthy:
        pong === 'PONG',
      status: pong
    };
  } catch (
    error
  ) {
    return {
      healthy: false,
      error:
        error.message
    };
  }
}