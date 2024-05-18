import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.URL_MONGO
    );
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
