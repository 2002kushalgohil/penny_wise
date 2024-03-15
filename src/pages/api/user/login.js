import bcrypt from "bcryptjs";
import dbConnect from "../../../../utils/db";
import User from "../../../../models/User";
import generateTokens from "../../../../utils/generateTokens";

// Connect to the database
dbConnect();

export default async function loginHandler(req, res) {
  // Ensure only POST requests are accepted
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      // Find user by email
      const existingUser = await User.findOne({ email });

      // If user not found, return error
      if (!existingUser) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      // If password is invalid, return error
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate access and refresh tokens
      const { accessToken, refreshToken } = generateTokens(existingUser._id);

      // Return tokens
      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      // Handle errors
      console.error("Error while logging in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle invalid HTTP method
  return res.status(405).json({ message: "Method not allowed" });
}
