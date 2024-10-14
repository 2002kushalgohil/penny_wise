import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "../../../../utils/db";
import User, { UserDocument } from "../../../../models/User";
import generateTokens from "../../../../utils/generateTokens";

// Connect to the database
dbConnect();

interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
}

export default async function resetPasswordHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const paramToken = req.query.token as string | undefined;
    const { password, confirmPassword }: ResetPasswordRequest = req.body;

    // Validate input
    if (!password || !confirmPassword || !paramToken) {
      return res.status(400).json({
        success: false,
        error: "Password, confirm password, and token are required",
      });
    }

    // Find user by token and check token validity
    const user: UserDocument | null = await User.findOne({
      forgotPasswordToken: paramToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Token expired" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords do not match" });
    }

    // Hash and update password
    user.password = await bcrypt.hash(password, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    // Generate new tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save user changes
    await user.save();

    // Return tokens
    return res.status(200).json({ success: true, accessToken, refreshToken });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while processing your request",
    });
  }
}
