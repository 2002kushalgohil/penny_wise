import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const cashHandler = withAuth(async function (
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
        return handleGetCash(userId, res);

      case "PUT":
        return handleUpdateCash(userId, req.body, res);

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

async function handleGetCash(userId: string, res: NextApiResponse) {
  try {
    // Find user by ID and retrieve cash information
    const user: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's cash information
    return res.status(200).json({ success: true, cash: user.cash });
  } catch (error) {
    console.error("Error fetching user cash information:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user cash information" });
  }
}

async function handleUpdateCash(
  userId: string,
  cashData: { wallet: number },
  res: NextApiResponse
) {
  try {
    // Update user's cash information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cash: cashData },
      { new: true }
    );

    // Handle user not found
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return success response with updated cash information
    return res.status(200).json({ success: true, cash: updatedUser.cash });
  } catch (error) {
    console.error("Error updating user cash information:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: "Failed to update user cash information",
      });
  }
}

export default cashHandler;
