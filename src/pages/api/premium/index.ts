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
  const userId = req.user?._id;

  // Ensure user is authenticated
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

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
});

async function handleGetPremium(userId: string, res: NextApiResponse) {
  try {
    const user: UserDocument | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({ success: true, premium: user.premium || {} });
  } catch (error) {
    console.error("Error fetching user premium information:", error);
    return res
      .status(500)
      .json({
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
    const {
      name,
      price,
      billingCycle,
      features,
      paymentDetails,
      expireDate,
      status,
    } = premiumData;

    // Validate premium data fields
    if (
      !name ||
      !price ||
      !billingCycle ||
      !features ||
      !paymentDetails ||
      !expireDate ||
      !status
    ) {
      return res
        .status(400)
        .json({
          success: false,
          error: "All fields are required for updating premium",
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { premium: premiumData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, premium: updatedUser.premium });
  } catch (error) {
    console.error("Error updating user premium information:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: "Failed to update user premium information",
      });
  }
}

export default premiumHandler;
