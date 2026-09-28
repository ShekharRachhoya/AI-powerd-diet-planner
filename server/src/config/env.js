import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string(),
  PORT: z.coerce.number(),
  MONGODB_URI: z.string(),
  REDIS_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GEMINI_API_KEY: z.string()
});

const env = schema.parse(process.env);
export default env


