import profileRepository from '../profile/profile.repository.js';
import dietPlanRepository from './dietPlan.repository.js';
import  ApiError  from '../../utils/ApiError.js';
import redisClient from '../../config/redis.js';
import { dietPlanQueue } from '../../queues/dietPlan.queue.js';

import cacheService
  from '../../services/cache.service.js';

import {
  CACHE_KEYS
}
  from '../../constants/cacheKeys.js';

import {
  CACHE_TTL
}
  from '../../constants/cacheTtl.js';


class DietPlanService {
  async generate(userId) {
    const profile =
      await profileRepository.findByUser(
        userId
      );

    if (!profile) {
      throw new ApiError(
        404,
        'Profile not found'
      );
    }

    const plan =
      await dietPlanRepository.create({
        user: userId,
        profile: profile._id,
        goal: profile.goal,
        calories:
          profile.calculations.calories,
        protein:
          profile.calculations.protein,
        carbs:
          profile.calculations.carbs,
        fats:
          profile.calculations.fats
      });

    await dietPlanQueue.add(
      'generate-diet-plan',
      {
        planId: plan._id.toString()
      }
    );

    return plan;
  }

  async getLatest(userId) {
    const cacheKey =
      CACHE_KEYS.DIET_PLAN(
        userId
      );

    const cached =
      await cacheService.get(
        cacheKey
      );

    if (cached) {
      return cached;
    }

    const plan =
      await dietPlanRepository
        .findLatestByUser(
          userId
        );

    if (!plan) {
      throw new ApiError(
        404,
        'Diet plan not found'
      );
    }

    await cacheService.set(
      cacheKey,
      plan,
      CACHE_TTL.DIET_PLAN
    );

    return plan;
  }
}

export default new DietPlanService();