import redisHealth
  from '../utils/redisHealth.js';

export const health =
  async (
    req,
    res
  ) => {
    const redis =
      await redisHealth();

    res.json({
      success: true,
      uptime:
        process.uptime(),
      services: {
        redis
      }
    });
  };