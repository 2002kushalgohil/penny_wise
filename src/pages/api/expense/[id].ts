import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import Expense, { ExpenseDocument } from "../../../../models/Expense";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const expenseHandler = withAuth(async function (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  // Ensure user is authorized to access the expenses
  const isAllowed = req.user?.expenses.find(
    (expenseId) => expenseId.toString() === id
  );

  // Check if user is allowed to access the expenses
  if (!isAllowed) {
    return res.status(403).json({ success: false, error: "Access forbidden" });
  }

  try {
    switch (method) {
      case "GET":
        return handleGetExpense(userId, id, res);

      case "PUT":
        return handleUpdateExpense(id, req.body, res);

      case "DELETE":
        return handleDeleteExpense(id, res);

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

async function handleGetExpense(
  userId: string | undefined,
  expenseId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    const user: UserDocument | null = await User.findById(userId).populate(
      "expenses"
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const expense = user.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, error: "Expense not found" });
    }

    return res.status(200).json({ success: true, expense });
  } catch (error) {
    console.error("Error fetching expense:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch expense" });
  }
}

async function handleUpdateExpense(
  expenseId: string | string[] | undefined,
  expenseData: ExpenseDocument,
  res: NextApiResponse
) {
  try {
    const { type, source, amount, date } = expenseData;

    if (!expenseId || !type || !source || !amount || !date) {
      return res.status(400).json({
        success: false,
        error: "Please fill all the details",
      });
    }

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId },
      expenseData,
      { new: true }
    );

    if (!updatedExpense) {
      return res
        .status(404)
        .json({ success: false, error: "Expense not found" });
    }

    return res.status(200).json({ success: true, expense: updatedExpense });
  } catch (error) {
    console.error("Error updating expense:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update expense" });
  }
}

async function handleDeleteExpense(
  expenseId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res
        .status(404)
        .json({ success: false, error: "Expense not found" });
    }

    await User.updateOne(
      { expenses: expenseId },
      { $pull: { expenses: expenseId } }
    );

    return res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete expense" });
  }
}

export default expenseHandler;
