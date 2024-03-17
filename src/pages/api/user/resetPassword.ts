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
    const paramToken: string | undefined = req.query.token as
      | string
      | undefined;
    const { password, confirmPassword }: ResetPasswordRequest = req.body;

    // Validate password, confirmPassword, and token
    if (!password || !confirmPassword || !paramToken) {
      return res.status(400).json({
        success: false,
        error: "Password, Confirm password, and token are required",
      });
    }

    // Find user by the provided token and ensure the token is not expired
    const user: UserDocument | null = await User.findOne({
      forgotPasswordToken: paramToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    // If user not found or token expired, return error
    if (!user) {
      return res.status(400).json({ success: false, error: "Token Expired" });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords do not match" });
    }

    // Hash the new password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Update user's password and clear forgot password token and expiry
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    // Generate new access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save user changes
    await user.save();

    // Return tokens
    return res.status(200).json({ success: true, accessToken, refreshToken });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: "An error occurred while processing your request",
      });
  }
}
