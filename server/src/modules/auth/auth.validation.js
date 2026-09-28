import { z } from "zod";

export const googleLoginSchema =
  z.object({
    body: z.object({
      idToken: z.string().min(1)
    })
  });

export const refreshSchema =
  z.object({
    body: z.object({
      refreshToken: z.string()
    })
  });