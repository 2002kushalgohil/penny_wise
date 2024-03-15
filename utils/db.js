import mongoose from "mongoose";

// Function to connect to MongoDB database
const dbConnect = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log successful connection
    console.log("MongoDB connected");
  } catch (error) {
    // Log connection error
    console.error("MongoDB connection error:", error.message);
  }
};

// Export the dbConnect function
export default dbConnect;
