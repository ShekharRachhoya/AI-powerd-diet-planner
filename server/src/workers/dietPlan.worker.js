import { Worker }
  from 'bullmq';

import redis
  from '../config/redis.js';



import profileRepository
  from '../modules/profile/profile.repository.js';

import dietPlanRepository
  from '../modules/diet-plan/dietPlan.repository.js';

import {
  PLAN_STATUS
}
  from '../modules/diet-plan/constants.js';

import {
  buildDietPrompt
}
  from '../modules/diet-plan/dietPlan.prompt.js';

import geminiService
  from '../services/gemini.service.js';

import extractJson
  from '../utils/extractJson.js';

import safeJsonParse
  from '../utils/safeJsonParse.js';

import cacheService
  from '../services/cache.service.js';

import {
  CACHE_KEYS
}
  from '../constants/cacheKeys.js';

import {
  CACHE_TTL
}
  from '../constants/cacheTtl.js';
import logger from '../utils/logger.js';


const worker =
  new Worker(
    'diet-plan',
    async job => {
      const {
        planId
      } = job.data;

      logger.info(
        `Processing plan ${planId}`
      );

      const plan =
        await dietPlanRepository
          .findById(
            planId
          );

      if (!plan) {
        throw new Error(
          'Diet plan not found'
        );
      }

      await dietPlanRepository
        .update(
          planId,
          {
            status:
              PLAN_STATUS.PROCESSING
          }
        );

      try {
        const profile =
          await profileRepository
            .findByUser(
              plan.user
            );

        const prompt =
          buildDietPrompt({
            profile
          });

        const response =
          await geminiService
            .generate(
              prompt
            );

        const json =
          extractJson(
            response
          );

        const result =
          safeJsonParse(
            json
          );

        if (!result) {
          throw new Error(
            'Invalid Gemini response'
          );
        }

        const updatedPlan =
          await dietPlanRepository
            .update(
              planId,
              {
                meals:
                  result.meals,
                recommendations:
                  result.recommendations,
                status:
                  PLAN_STATUS.COMPLETED,
                generatedAt:
                  new Date()
              }
            );

        logger.info(
          `Diet plan generated ${planId}`
        );

        await cacheService.set(
          CACHE_KEYS.DIET_PLAN(
            plan.user.toString()
          ),
          updatedPlan,
          CACHE_TTL.DIET_PLAN
        );

        return updatedPlan;
      } catch (error) {
        logger.error(
          error
        );

        await dietPlanRepository
          .update(
            planId,
            {
              status:
                PLAN_STATUS.FAILED
            }
          );

        throw error;
      }
    },
    {
      connection:
        redis,
      concurrency: 5
    }
  );

export default worker;