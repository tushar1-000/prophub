import mongoose from "mongoose";

let connected = false;
const connectDB = async () => {
  //connect to MONGODB
  if (connected) {
    console.log("MONGODB already connected...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB connected...");
    
    connected = true;
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
