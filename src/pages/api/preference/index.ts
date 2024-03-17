import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";
import { PreferencesDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const preferencesHandler = withAuth(async function (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  // Extract user ID from request
  const userId = req.user?._id;

  try {
    // Ensure user is authenticated
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    // Handle different HTTP methods
    switch (req.method) {
      case "GET":
        return handleGetPreferences(userId, res);

      case "PUT":
        return handleUpdatePreferences(userId, req.body, res);

      default:
        return res
          .status(405)
          .json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

async function handleGetPreferences(userId: string, res: NextApiResponse) {
  try {
    // Find user by ID and populate preferences
    const user: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's preferences
    return res
      .status(200)
      .json({ success: true, preferences: user.preferences || {} });
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user preferences" });
  }
}

async function handleUpdatePreferences(
  userId: string,
  preferencesData: PreferencesDocument,
  res: NextApiResponse
) {
  try {
    // Update user's preferences
    const updatedPreferences = await User.findByIdAndUpdate(
      userId,
      { preferences: preferencesData },
      { new: true }
    );

    // Handle user not found
    if (!updatedPreferences) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return success response with updated preferences
    return res
      .status(200)
      .json({ success: true, preferences: updatedPreferences.preferences });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update preferences" });
  }
}

export default preferencesHandler;
