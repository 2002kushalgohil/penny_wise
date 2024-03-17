import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import Budget, { BudgetDocument } from "../../../../models/Budget";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const budgetHandler = withAuth(async function (
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
        return handleGetBudget(userId, res);

      case "POST":
        return handleCreateBudget(userId, req.body, res);

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

async function handleGetBudget(userId: string, res: NextApiResponse) {
  try {
    // Find budgets belonging to the user
    const currentUser: UserDocument | null = await User.findById(
      userId
    ).populate("budgets");

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's budgets
    return res
      .status(200)
      .json({ success: true, budgets: currentUser.budgets });
  } catch (error) {
    console.error("Error fetching user budgets:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user budgets" });
  }
}

async function handleCreateBudget(
  userId: string,
  budgetData: BudgetDocument,
  res: NextApiResponse
) {
  try {
    // Destructure necessary fields from budgetData
    const { type, budget, timeSpan }: BudgetDocument = budgetData;

    // Check if required fields are provided
    if (!type || !budget || !timeSpan) {
      return res.status(400).json({
        success: false,
        error: "All Fields are required",
      });
    }

    // Create new budget
    const newBudget: BudgetDocument = new Budget(budgetData);

    // Save new budget
    const savedBudget = await newBudget.save();

    // Find user
    const currentUser: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Add new budget to user's budgets
    currentUser.budgets.push(savedBudget._id);

    // Save updated user document
    await currentUser.save();

    // Return success response
    return res.status(201).json({ success: true, budget: savedBudget });
  } catch (error) {
    console.error("Error creating budget:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export default budgetHandler;
