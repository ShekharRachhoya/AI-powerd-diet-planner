import cacheService from '../services/cache.service.js';
import { CACHE_KEYS } from '../constants/cacheKeys.js';
import { CACHE_TTL } from '../constants/cacheTtl.js';
import { ApiError } from '../shared/errors/ApiError.js';

export default function rateLimit(
  limit = 100,
  windowSeconds = 60
) {
  return async (
    req,
    res,
    next
  ) => {
    try {
      const key =
        CACHE_KEYS.RATE_LIMIT(
          req.ip
        );

      const count =
        await cacheService.increment(
          key,
          windowSeconds
        );

      if (count > limit) {
        throw new ApiError(
          429,
          'Too many requests'
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}