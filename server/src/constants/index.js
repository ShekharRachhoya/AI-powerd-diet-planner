export const NODE_ENV = process.env.NODE_ENV;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: "strict"
};

export const CACHE_TTL = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600
};

export const QUEUES = {
  DIET_PLAN: "diet-plan",
  WORKOUT_PLAN: "workout-plan"
};