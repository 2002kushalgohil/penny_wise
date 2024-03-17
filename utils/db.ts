import mongoose from "mongoose";

// Function to connect to MongoDB database
const dbConnect = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Log successful connection
    console.log("MongoDB connected");
  } catch (error) {
    // Log connection error and exit process
    console.error("MongoDB connection error:", (error as Error).message);
    process.exit(1);
  }
};

// Export the dbConnect function
export default dbConnect;
