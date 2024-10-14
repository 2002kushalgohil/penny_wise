import mongoose from "mongoose";

// Function to connect to MongoDB database
const dbConnect = async (): Promise<void> => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", (error as Error).message);
    process.exit(1);
  }
};

export default dbConnect;
