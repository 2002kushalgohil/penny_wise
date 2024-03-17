import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "../../../../utils/db";
import User, { UserDocument } from "../../../../models/User";
import generateTokens from "../../../../utils/generateTokens";

// Connect to the database
dbConnect();

interface LoginRequest {
  email: string;
  password: string;
}

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { email, password }: LoginRequest = req.body;

    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }

    // Find user by email
    const existingUser: UserDocument | null = await User.findOne({ email });

    // If user not found or password doesn't match, return error
    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(existingUser._id);

    // Update lastLogin field
    existingUser.lastLogin = new Date();
    await existingUser.save();

    // Return tokens
    return res.status(200).json({ success: true, accessToken, refreshToken });
  } catch (error) {
    // Handle errors
    console.error("Error while logging in:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
