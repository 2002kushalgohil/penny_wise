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
  // Extract necessary information from the request
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  // Ensure user is authorized to access the expenses
  const isAllowed = req.user?.expenses.find(
    (expensesId) => expensesId.toString() === id
  );

  // Check if user is allowed to access the expenses
  if (!isAllowed) {
    return res.status(401).json({ success: false, error: "Expense Not Found" });
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
    // Find user by ID and populate expense
    const user: UserDocument | null = await User.findById(userId).populate(
      "expenses"
    );

    // Return error if user not found
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find expense in user's expenses array
    const expense = user.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );

    // Return expense information
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
    // Extract necessary fields from request body
    const { category, amount, date }: ExpenseDocument = expenseData;

    // Check if required fields are provided
    if (!expenseId || !category || !amount || !date) {
      return res.status(400).json({
        success: false,
        error: "Please fill all the details",
      });
    }

    // Update the expense and get the updated document
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId },
      expenseData,
      { new: true }
    );

    // Return error if expense not found
    if (!updatedExpense) {
      return res
        .status(404)
        .json({ success: false, error: "Expense not found" });
    }

    // Return success response with updated expense information
    return res.status(200).json({ success: true, expense: updatedExpense });
  } catch (error) {
    // Handle any errors occurred during updating expense
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
    // Delete the expense
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    // Return error if expense not found
    if (!deletedExpense) {
      return res
        .status(404)
        .json({ success: false, error: "Expense not found" });
    }

    // Remove the expense ID from user's expenses array
    await User.updateOne(
      { expenses: expenseId },
      { $pull: { expenses: expenseId } }
    );

    // Return success response
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
