import { Queue }
from 'bullmq';

import redis
from '../config/redis.js';

export const dietPlanQueue =
  new Queue(
    'diet-plan',
    {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 1000,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000
        }
      }
    }
  );