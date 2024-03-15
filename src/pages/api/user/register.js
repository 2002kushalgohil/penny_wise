import bcrypt from "bcryptjs";
import dbConnect from "../../../../utils/db";
import User from "../../../../models/User";
import generateTokens from "../../../../utils/generateTokens";

// Connect to the database
dbConnect();

export default async function registerHandler(req, res) {
  // Ensure only POST requests are accepted
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    // Validate username, email, and password
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    try {
      // Check if email is already registered
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Check if username is already taken
      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already taken" });
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
      return res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      // Handle errors
      console.error("Error while registering user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Handle invalid HTTP method
  return res.status(405).json({ message: "Method not allowed" });
}
