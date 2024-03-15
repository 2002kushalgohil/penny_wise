import { withAuth } from "../../../../middlewares/auth";
import User from "../../../../models/User";

// Handler function to update user's personal information
export default withAuth(async function updateUserPersonalInfo(req, res) {
  try {
    // Ensure only PUT requests are accepted
    if (req.method !== "PUT") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Extract userId from request query parameters
    const userId = req.query.id;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    // Extract personalInfo from request body
    const { personalInfo } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If personalInfo is provided, update user's personalInfo
    if (personalInfo) {
      user.personalInfo = personalInfo;
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Return updated user object
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ error: "Oops! Something went wrong" });
  }
});
