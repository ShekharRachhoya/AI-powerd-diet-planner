import mongoose from 'mongoose';
import {
  GOALS,
  ACTIVITY_LEVELS,
  GENDERS,
  DIETARY_PREFERENCES
} from './constants.js';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },

    age: {
      type: Number,
      min: 13,
      max: 120
    },

    gender: {
      type: String,
      enum: GENDERS
    },

    height: {
      type: Number,
      min: 100,
      max: 250
    },

    weight: {
      type: Number,
      min: 20,
      max: 500
    },

    goal: {
      type: String,
      enum: GOALS
    },

    activityLevel: {
      type: String,
      enum: ACTIVITY_LEVELS
    },

    dietaryPreferences: [{
      type: String,
      enum: DIETARY_PREFERENCES
    }],

    allergies: [{
      type: String,
      trim: true
    }],

    medicalConditions: [{
      type: String,
      trim: true
    }],

    calculations: {
      waterIntake: Number,
      bmr: Number,
      tdee: Number,
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
      completionPercentage: Number
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Profile', profileSchema);