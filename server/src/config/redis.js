import Redis from 'ioredis';
import env from './env.js';

const redis = new Redis(
  env.REDIS_URL,
  {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: true,

    retryStrategy(times) {
      return Math.min(
        times * 200,
        3000
      );
    }
  }
);

redis.on(
  'connect',
  () => {
    console.log(
      'Redis connected'
    );
  }
);

redis.on(
  'error',
  error => {
    console.error(
      'Redis Error:',
      error.message
    );
  }
);

export default redis;