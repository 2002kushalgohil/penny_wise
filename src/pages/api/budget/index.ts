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
  const userId = req.user?._id;

  if (!userId) {
    return sendErrorResponse(res, 401, "Unauthorized");
  }

  try {
    switch (req.method) {
      case "GET":
        return handleGetBudget(userId, res);
      case "POST":
        return handleCreateBudget(userId, req.body, res);
      default:
        return sendErrorResponse(res, 405, "Method not allowed");
    }
  } catch (error) {
    console.error("Error:", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
});

// Utility function to send error responses
function sendErrorResponse(
  res: NextApiResponse,
  statusCode: number,
  message: string
) {
  return res.status(statusCode).json({ success: false, error: message });
}

async function handleGetBudget(userId: string, res: NextApiResponse) {
  try {
    const user: UserDocument | null = await User.findById(userId).populate(
      "budgets"
    );
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }
    return res.status(200).json({ success: true, budgets: user.budgets });
  } catch (error) {
    console.error("Error fetching user budgets:", error);
    return sendErrorResponse(res, 500, "Failed to fetch user budgets");
  }
}

async function handleCreateBudget(
  userId: string,
  budgetData: BudgetDocument,
  res: NextApiResponse
) {
  const { type, budget, timeSpan } = budgetData;

  if (!type || !budget || !timeSpan) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  try {
    const newBudget: BudgetDocument = new Budget(budgetData);
    const savedBudget = await newBudget.save();

    const user: UserDocument | null = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    user.budgets.push(savedBudget._id);
    await user.save();

    return res.status(201).json({ success: true, budget: savedBudget });
  } catch (error) {
    console.error("Error creating budget:", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
}

export default budgetHandler;
