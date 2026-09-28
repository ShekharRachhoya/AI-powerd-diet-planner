import cacheService
from '../services/cache.service.js';

export default function cache(
  keyGenerator,
  ttl
) {
  return async (
    req,
    res,
    next
  ) => {
    try {
      const key =
        keyGenerator(
          req
        );

      const cached =
        await cacheService.get(
          key
        );

      if (
        cached
      ) {
        return res.json(
          cached
        );
      }

      const originalJson =
        res.json.bind(
          res
        );

      res.json =
        async data => {
          await cacheService.set(
            key,
            data,
            ttl
          );

          return originalJson(
            data
          );
        };

      next();
    } catch (
      error
    ) {
      next(
        error
      );
    }
  };
}