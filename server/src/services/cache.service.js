import redis
from '../config/redis.js';

class CacheService {
  async get(key) {
    const value =
      await redis.get(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  async set(
    key,
    value,
    ttl
  ) {
    const serialized =
      typeof value === 'string'
        ? value
        : JSON.stringify(value);

    if (ttl) {
      return redis.set(
        key,
        serialized,
        'EX',
        ttl
      );
    }

    return redis.set(
      key,
      serialized
    );
  }

  async delete(key) {
    return redis.del(key);
  }

  async exists(key) {
    const result =
      await redis.exists(key);

    return result === 1;
  }

  async increment(
    key,
    ttl
  ) {
    const value =
      await redis.incr(key);

    if (value === 1 && ttl) {
      await redis.expire(
        key,
        ttl
      );
    }

    return value;
  }

  async ttl(key) {
    return redis.ttl(key);
  }

  async clearPattern(
    pattern
  ) {
    const stream =
      redis.scanStream({
        match: pattern,
        count: 100
      });

    return new Promise(
      (
        resolve,
        reject
      ) => {
        stream.on(
          'data',
          async keys => {
            if (
              keys.length
            ) {
              await redis.del(
                ...keys
              );
            }
          }
        );

        stream.on(
          'end',
          resolve
        );

        stream.on(
          'error',
          reject
        );
      }
    );
  }
}

export default new CacheService();