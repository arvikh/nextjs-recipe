import mongoose from "mongoose";

let isConnected: boolean = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("already connected");
    return;
  }
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI as string);

    isConnected = true;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};
export default connectToDB;
