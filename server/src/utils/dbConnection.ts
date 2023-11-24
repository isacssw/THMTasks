import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose.connect(process.env.MONGODB_URL!).catch((error) => {
    console.log(error);
  });
};