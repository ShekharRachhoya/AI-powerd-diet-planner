import {
  dietPlanQueueEvents
}
from './queues/index.js';

dietPlanQueueEvents.on(
  'completed',
  ({ jobId }) => {
    console.log(
      `Job completed: ${jobId}`
    );
  }
);

dietPlanQueueEvents.on(
  'failed',
  ({
    jobId,
    failedReason
  }) => {
    console.error(
      `Job failed: ${jobId}`,
      failedReason
    );
  }
);



process.on(
  'SIGTERM',
  async () => {
    await dietPlanQueue.close();
    process.exit(0);
  }
);

process.on(
  'SIGINT',
  async () => {
    await dietPlanQueue.close();
    process.exit(0);
  }
);