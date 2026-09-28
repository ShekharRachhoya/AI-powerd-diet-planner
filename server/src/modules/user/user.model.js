import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    name: {
      type: String,
      required: true
    },

    picture: String,

    provider: {
      type: String,
      enum: ["google"],
      default: "google"
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    refreshTokens: [
      {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "User",
  userSchema
);