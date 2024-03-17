import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import FinancialGoal, {
  FinancialGoalDocument,
} from "../../../../models/FinancialGoal";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const financialGoalHandler = withAuth(async function (
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
        return handleGetFinancialGoals(userId, res);

      case "POST":
        return handleCreateFinancialGoal(userId, req.body, res);

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

async function handleGetFinancialGoals(userId: string, res: NextApiResponse) {
  try {
    // Find financial goals belonging to the user
    const currentUser: UserDocument | null = await User.findById(
      userId
    ).populate("financialGoals");

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's financial goals
    return res
      .status(200)
      .json({ success: true, financialGoals: currentUser.financialGoals });
  } catch (error) {
    console.error("Error fetching user financial goals:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user financial goals" });
  }
}

async function handleCreateFinancialGoal(
  userId: string,
  financialGoalData: FinancialGoalDocument,
  res: NextApiResponse
) {
  try {
    // Destructure necessary fields from financialGoalData
    const { name, targetAmount, targetDate }: FinancialGoalDocument =
      financialGoalData;

    // Check if required fields are provided
    if (!name || !targetAmount || !targetDate) {
      return res.status(400).json({
        success: false,
        error:
          "Name, target amount, and target date are required for creating a financial goal",
      });
    }

    // Create new financial goal
    const newFinancialGoal: FinancialGoalDocument = new FinancialGoal(
      financialGoalData
    );

    // Save new financial goal
    const savedFinancialGoal = await newFinancialGoal.save();

    // Find user
    const currentUser: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Add new financial goal to user's financial goals
    currentUser.financialGoals.push(savedFinancialGoal._id);

    // Save updated user document
    await currentUser.save();

    // Return success response
    return res
      .status(201)
      .json({ success: true, financialGoal: savedFinancialGoal });
  } catch (error) {
    console.error("Error creating financial goal:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export default financialGoalHandler;
