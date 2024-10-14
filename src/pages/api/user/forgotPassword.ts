import { NextApiRequest, NextApiResponse } from "next";
import User, { UserDocument } from "../../../../models/User";
import dbConnect from "../../../../utils/db";
import emailSender from "../../../../utils/emailSender";
import { resetPassword } from "../../../../utils/emailTemplates";
import crypto from "crypto";
import { WEBSITE_URL } from "../../../../config/config";

// Connect to the database
dbConnect();

interface ForgotPasswordRequest {
  email: string;
}

export default async function forgotPasswordHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Ensure only POST requests are accepted
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    const { email }: ForgotPasswordRequest = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    // Find user by email
    const user: UserDocument | null = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "Email Not Registered" });
    }

    // Generate token and expiry time for password reset
    const forgotToken: string = crypto.randomBytes(20).toString("hex");
    const forgotPasswordExpiry: Date = new Date(Date.now() + 20 * 60 * 1000);

    // Update user's forgot password token and expiry
    user.forgotPasswordToken = forgotToken;
    user.forgotPasswordExpiry = forgotPasswordExpiry;
    await user.save({ validateBeforeSave: true });

    // Construct reset password URL
    const resetUrl: string = `${WEBSITE_URL}/resetpassword/${forgotToken}`;

    // Send reset password email
    await sendResetPasswordEmail(user.email, resetUrl);

    return res.status(200).json({
      success: true,
      message: "Please check your email to reset your password",
    });
  } catch (error) {
    console.error("Error processing forgot password request:", error);
    return res.status(500).json({ success: false, error: "Oops! Something went wrong" });
  }
}

async function sendResetPasswordEmail(email: string, resetUrl: string) {
  try {
    const message: string = resetPassword(resetUrl);
    await emailSender({
      email,
      subject: "Penny Wise: Reset Your Password",
      message,
    });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
}
