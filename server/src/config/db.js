import mongoose from "mongoose";

export const connectDB = async () => {
  console.log(process.env.MONGO_URI)
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};