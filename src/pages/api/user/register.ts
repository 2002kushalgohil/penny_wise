import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "../../../../utils/db";
import User from "../../../../models/User";
import generateTokens from "../../../../utils/generateTokens";

// Connect to the database
dbConnect();

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { username, email, password }: RegisterRequest = req.body;

    // Validate username, email, and password
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Username, email, and password are required",
      });
    }

    // Check if email is already registered
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" });
    }

    // Check if username is already taken
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(newUser._id);

    // Return tokens
    return res.status(201).json({ success: true, accessToken, refreshToken });
  } catch (error) {
    // Handle errors
    console.error("Error while registering user:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
