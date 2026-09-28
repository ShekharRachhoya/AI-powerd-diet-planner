export const CACHE_KEYS = {
  PROFILE: userId => `profile:${userId}`,

  DIET_PLAN: userId =>
    `diet-plan:${userId}`,

  SESSION: sessionId =>
    `session:${sessionId}`,

  REFRESH_TOKEN: userId =>
    `refresh-token:${userId}`,

  RATE_LIMIT: key =>
    `rate-limit:${key}`
};