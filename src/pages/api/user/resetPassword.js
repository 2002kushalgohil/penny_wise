import bcrypt from "bcryptjs";
import dbConnect from "../../../../utils/db";
import User from "../../../../models/User";
import generateTokens from "../../../../utils/generateTokens";

// Connect to the database
dbConnect();

export default async function resetPasswordHandler(req, res) {
  // Ensure only POST requests are accepted
  if (req.method === "POST") {
    try {
      // Extract token from query parameters and password from request body
      const paramToken = req.query.token;
      const { password, confirmPassword } = req.body;

      // Find user by the provided token and ensure the token is not expired
      const user = await User.findOne({
        forgotPasswordToken: paramToken,
        forgotPasswordExpiry: { $gt: Date.now() },
      });

      // Validate password, confirmPassword, and token
      if (!password || !confirmPassword || !paramToken) {
        return res.status(400).json({
          message: "Password, Confirm password, and token are required",
        });
      }

      // If user not found or token expired, return error
      if (!user) {
        return res.status(400).json({ message: "Token Expired" });
      }

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user's password and clear forgot password token and expiry
      user.password = hashedPassword;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiry = undefined;

      // Generate new access and refresh tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Save user changes
      await user.save();

      // Return tokens
      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      // Handle errors
      console.error("Error resetting password:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while processing your request" });
    }
  } else {
    // Handle invalid HTTP method
    return res.status(405).json({ message: "Method not allowed" });
  }
}
