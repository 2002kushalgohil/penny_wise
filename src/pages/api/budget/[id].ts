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
  const { method } = req;
  const userId = req.user?._id;
  const { id: budgetId } = req.query;

  try {
    // Check if the budget belongs to the authenticated user
    const isAllowed = await Budget.findOne({ _id: budgetId, user: userId });

    if (!isAllowed) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized or budget not found" });
    }

    switch (method) {
      case "GET":
        return handleGetBudget(userId, budgetId, res);

      case "PUT":
        return handleUpdateBudget(budgetId, req.body, res);

      case "DELETE":
        return handleDeleteBudget(budgetId, res);

      default:
        return res
          .status(405)
          .json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in budget handler:", error);
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
    // Find the user and populate the budgets
    const user: UserDocument | null = await User.findById(userId).populate(
      "budgets"
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find the budget in the user's budgets array
    const budget = user.budgets.find(
      (budget) => budget._id.toString() === budgetId
    );

    if (!budget) {
      return res
        .status(404)
        .json({ success: false, error: "Budget not found" });
    }

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
    const { type, budget, timeSpan } = budgetData;

    if (!type || !budget || !timeSpan) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: budgetId },
      budgetData,
      { new: true, runValidators: true }
    );

    if (!updatedBudget) {
      return res
        .status(404)
        .json({ success: false, error: "Budget not found" });
    }

    return res.status(200).json({ success: true, updatedBudget });
  } catch (error) {
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
    const deletedBudget = await Budget.findByIdAndDelete(budgetId);

    if (!deletedBudget) {
      return res
        .status(404)
        .json({ success: false, error: "Budget not found" });
    }

    await User.updateOne(
      { budgets: budgetId },
      { $pull: { budgets: budgetId } }
    );

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
