import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { PremiumDocument, UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const premiumHandler = withAuth(async function (
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
        return handleGetPremium(userId, res);

      case "PUT":
        return handleUpdatePremium(userId, req.body, res);

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

async function handleGetPremium(userId: string, res: NextApiResponse) {
  try {
    // Find user by ID and retrieve premium information
    const user: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's premium information
    return res.status(200).json({ success: true, premium: user.premium || {} });
  } catch (error) {
    console.error("Error fetching user premium information:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch user premium information",
    });
  }
}

async function handleUpdatePremium(
  userId: string,
  premiumData: PremiumDocument,
  res: NextApiResponse
) {
  try {
    // Validate premium data fields
    const {
      name,
      price,
      billingCycle,
      features,
      paymentDetails,
      expireDate,
      status,
    }: PremiumDocument = premiumData;
    if (
      !name ||
      !price ||
      !billingCycle ||
      !features ||
      !paymentDetails ||
      !expireDate ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required for updating premium",
      });
    }

    // Update user's premium information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { premium: premiumData },
      { new: true }
    );

    // Handle user not found
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return success response with updated premium information
    return res
      .status(200)
      .json({ success: true, premium: updatedUser.premium });
  } catch (error) {
    console.error("Error updating user premium information:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update user premium information",
    });
  }
}

export default premiumHandler;
