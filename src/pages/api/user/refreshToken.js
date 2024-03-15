import jwt from "jsonwebtoken";
import dbConnect from "../../../../utils/db";
import User from "../../../../models/User";
import generateTokens from "../../../../utils/generateTokens";

// Connect to the database
dbConnect();

export default async function refreshTokenHandler(req, res) {
  // Ensure only POST requests are accepted
  if (req.method === "POST") {
    const { refreshToken } = req.body;

    // Validate refreshToken
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const userId = decoded.userId;

      // Find user by userId
      const existingUser = await User.findById(userId);

      // If user not found, return error
      if (!existingUser) {
        return res.status(400).json({ message: "User not found" });
      }

      // Generate new access and refresh tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        existingUser._id
      );

      // Return new tokens
      return res
        .status(200)
        .json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      // Handle token verification errors
      console.error("Error while refreshing token:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Refresh token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle invalid HTTP method
  return res.status(405).json({ message: "Method not allowed" });
}
