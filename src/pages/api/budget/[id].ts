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
  // Extract necessary information from the request
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  // Ensure user is authorized to access the budgets
  const isAllowed = req.user?.budgets.find(
    (budgetId) => budgetId.toString() === id
  );

  // Check if user is allowed to access the budgets
  if (!isAllowed) {
    return res.status(401).json({ success: false, error: "Budget Not Found" });
  }

  try {
    switch (method) {
      case "GET":
        return handleGetBudget(userId, id, res);

      case "PUT":
        return handleUpdateBudget(id, req.body, res);

      case "DELETE":
        return handleDeleteBudget(id, res);

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

async function handleGetBudget(
  userId: string | undefined,
  budgetId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    // Find user by ID and populate budget
    const user: UserDocument | null = await User.findById(userId).populate(
      "budgets"
    );

    // Return error if user not found
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find budget in user's budgets array
    const budget = user.budgets.find(
      (budget) => budget._id.toString() === budgetId
    );

    // Return budget information
    return res.status(200).json({ success: true, budget });
  } catch (error) {
    console.error("Error fetching budget:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch budget" });
  }
}

async function handleUpdateBudget(
  budgetId: string | string[] | undefined,
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
        error: "All fields are required",
      });
    }

    // Update the budget and get the updated document
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: budgetId },
      budgetData,
      { new: true }
    );

    // Return error if budget not found
    if (!updatedBudget) {
      return res
        .status(404)
        .json({ success: false, error: "Budget not found" });
    }

    // Return success response with updated budget information
    return res.status(200).json({ success: true, updatedBudget });
  } catch (error) {
    // Handle any errors occurred during updating budget
    console.error("Error updating budget:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update budget" });
  }
}

async function handleDeleteBudget(
  budgetId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    // Delete the budget
    const deletedBudget = await Budget.findByIdAndDelete(budgetId);

    // Return error if budget not found
    if (!deletedBudget) {
      return res
        .status(404)
        .json({ success: false, error: "Budget not found" });
    }

    // Remove the budget ID from user's budgets array
    await User.updateOne(
      { budgets: budgetId },
      { $pull: { budgets: budgetId } }
    );

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete budget" });
  }
}

export default budgetHandler;
