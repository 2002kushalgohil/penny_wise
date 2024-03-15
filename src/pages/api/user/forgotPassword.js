import User from "../../../../models/User";
import dbConnect from "../../../../utils/db";
import emailSender from "../../../../utils/emailSender";
import { resetPassword } from "../../../../utils/emailTemplates";
const crypto = require("crypto");

// Connect to the database
dbConnect();

export default async function forgotPasswordHandler(req, res) {
  // Ensure only POST requests are accepted
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      // Validate email
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Find user by email
      const user = await User.findOne({ email });

      // If user not found, return error
      if (!user) {
        return res.status(400).json({ message: "Email Not Registered" });
      }

      // Generate token and expiry time for password reset
      const forgotToken = crypto.randomBytes(20).toString("hex");
      const forgotPasswordExpiry = new Date(Date.now() + 20 * 60 * 1000);

      // Update user's forgot password token and expiry
      user.forgotPasswordToken = forgotToken;
      user.forgotPasswordExpiry = forgotPasswordExpiry;
      await user.save({ validateBeforeSave: true });

      // Construct reset password URL and email message
      const url = `${process.env.WEBSITE_URL}/resetpassword?token=${forgotToken}`;
      const message = resetPassword(url);

      try {
        // Send reset password email
        await emailSender({
          email: user.email,
          subject: "Penny Wise: Here's how to reset your password",
          message,
        });

        // Return success response
        return res
          .status(200)
          .json({ message: "Please check your email to reset your password" });
      } catch (error) {
        // Handle email sending error
        console.error("Error sending email:", error);

        // Reset user's forgot password token and expiry
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save({ validateBeforeSave: true });

        // Return error response
        return res.status(500).json({ message: "Oops! Something went wrong" });
      }
    } catch (error) {
      // Handle request processing error
      console.error("Error processing request:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while processing your request" });
    }
  } else {
    // Handle invalid HTTP method
    return res.status(405).json({ message: "Method not allowed" });
  }
}
