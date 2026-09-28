import profileRepository from './profile.repository.js';
import redisClient from '../../config/redis.js';
import  ApiError  from '../../utils/ApiError.js';

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

import {
  calculateWaterIntake,
  calculateBMR,
  calculateTDEE,
  calculateMacros,
  calculateCompletionPercentage
} from '../../utils/healthCalculator.js';

class ProfileService {
  async getProfile(userId) {
    const cacheKey =
      CACHE_KEYS.PROFILE(
        userId
      );

    const cached =
      await cacheService.get(
        cacheKey
      );

    if (cached) {
      return cached;
    }

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

    await cacheService.set(
      cacheKey,
      profile,
      CACHE_TTL.PROFILE
    );

    return profile;
  }

  async upsertProfile(
    userId,
    payload
  ) {
    const bmr = calculateBMR(payload);

    const tdee =
      calculateTDEE({
        bmr,
        activityLevel:
          payload.activityLevel
      });

    const waterIntake =
      calculateWaterIntake(
        payload
      );

    const macros =
      calculateMacros({
        tdee,
        goal: payload.goal
      });

    const completionPercentage =
      calculateCompletionPercentage(
        payload
      );

    const calculations = {
      waterIntake,
      bmr,
      tdee,
      ...macros,
      completionPercentage
    };

    let profile =
      await profileRepository.findByUser(
        userId
      );

    if (!profile) {
      profile =
        await profileRepository.create({
          user: userId,
          ...payload,
          calculations
        });
    } else {
      profile =
        await profileRepository.update(
          userId,
          {
            ...payload,
            calculations
          }
        );
    }

    await redisClient.del(
      `profile:${userId}`
    );

    return profile;
  }

  async deleteProfile(userId) {
    await cacheService.delete(
  CACHE_KEYS.PROFILE(
    userId
  )
);
  }
}

export default new ProfileService();