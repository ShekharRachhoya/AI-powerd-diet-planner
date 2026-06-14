// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  googleId: String,
  age: Number,
  weight: Number,
  height: Number,
  goal: String,
  activityLevel: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);