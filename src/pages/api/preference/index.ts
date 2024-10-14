import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, {
  UserDocument,
  PreferencesDocument,
} from "../../../../models/User";

// Connect to the database
dbConnect();

const preferencesHandler = withAuth(async function (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  const userId = req.user?._id;

  // Ensure user is authenticated
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

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
});

async function handleGetPreferences(userId: string, res: NextApiResponse) {
  try {
    const user: UserDocument | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

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
    const updatedPreferences = await User.findByIdAndUpdate(
      userId,
      { preferences: preferencesData },
      { new: true }
    );

    if (!updatedPreferences) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

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
