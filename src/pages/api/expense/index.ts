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

const expensesHandler = withAuth(async function (
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
        return handleGetExpenses(userId, res);

      case "POST":
        return handleCreateExpense(userId, req.body, res);

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

async function handleGetExpenses(userId: string, res: NextApiResponse) {
  try {
    // Find expenses belonging to the user
    const currentUser: UserDocument | null = await User.findById(
      userId
    ).populate("expenses");

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's expenses
    return res
      .status(200)
      .json({ success: true, expenses: currentUser.expenses });
  } catch (error) {
    console.error("Error fetching user expenses:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user expenses" });
  }
}

async function handleCreateExpense(
  userId: string,
  expenseData: ExpenseDocument,
  res: NextApiResponse
) {
  try {
    // Destructure necessary fields from expenseData
    const { category, amount, date }: ExpenseDocument = expenseData;

    // Check if required fields are provided
    if (!category || !amount || !date) {
      return res.status(400).json({
        success: false,
        error:
          "Category, amount, and date are required for creating an expense",
      });
    }

    // Create new expense
    const newExpense: ExpenseDocument = new Expense(expenseData);

    // Save new expense
    const savedExpense = await newExpense.save();

    // Find user
    const currentUser: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Add new expense to user's expenses
    currentUser.expenses.push(savedExpense._id);

    // Save updated user document
    await currentUser.save();

    // Return success response
    return res.status(201).json({ success: true, expense: savedExpense });
  } catch (error) {
    console.error("Error creating expense:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export default expensesHandler;
