import mongoose from 'mongoose';
import { PLAN_STATUS } from './constants.js';

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    foods: [String]
  },
  {
    _id: false
  }
);

const dietPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },

    goal: String,

    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,

    meals: [mealSchema],

    recommendations: [String],

    aiProvider: {
      type: String,
      default: 'gemini'
    },

    status: {
      type: String,
      enum: Object.values(PLAN_STATUS),
      default: PLAN_STATUS.PENDING
    },

    generatedAt: Date
  },
  {
    timestamps: true
  }
);

dietPlanSchema.index({
  user: 1,
  createdAt: -1
});

export default mongoose.model(
  'DietPlan',
  dietPlanSchema
);