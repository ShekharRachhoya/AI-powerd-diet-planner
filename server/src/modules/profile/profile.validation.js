import { z } from 'zod';

export const profileSchema = z.object({
  age: z.number().int().min(13).max(120),

  gender: z.enum([
    'male',
    'female',
    'other'
  ]),

  height: z.number().min(100).max(250),

  weight: z.number().min(20).max(500),

  goal: z.enum([
    'weight_loss',
    'maintenance',
    'muscle_gain'
  ]),

  activityLevel: z.enum([
    'sedentary',
    'light',
    'moderate',
    'active',
    'very_active'
  ]),

  dietaryPreferences: z
    .array(
      z.enum([
        'vegetarian',
        'vegan',
        'eggetarian',
        'non_vegetarian'
      ])
    )
    .optional(),

  allergies: z
    .array(z.string())
    .optional(),

  medicalConditions: z
    .array(z.string())
    .optional()
});

export const updateProfileSchema =
  profileSchema.partial();