import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import Income, { IncomeDocument } from "../../../../models/Income";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const incomeHandler = withAuth(async function (
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
        return handleGetIncome(userId, res);

      case "POST":
        return handleCreateIncome(userId, req.body, res);

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

async function handleGetIncome(userId: string, res: NextApiResponse) {
  try {
    // Find incomes belonging to the user
    const currentUser: UserDocument | null = await User.findById(
      userId
    ).populate("incomes");

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's incomes
    return res
      .status(200)
      .json({ success: true, incomes: currentUser.incomes });
  } catch (error) {
    console.error("Error fetching user Incomes:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user Incomes" });
  }
}

async function handleCreateIncome(
  userId: string,
  incomeData: IncomeDocument,
  res: NextApiResponse
) {
  try {
    // Destructure necessary fields from incomeData
    const { type, source, amount, date }: IncomeDocument = incomeData;

    // Check if required fields are provided
    if (!type || !source || !amount || !date) {
      return res.status(400).json({
        success: false,
        error: "All Fields are required",
      });
    }

    // Create new income
    const newIncome: IncomeDocument = new Income(incomeData);

    // Save new income
    const savedIncome = await newIncome.save();

    // Find user
    const currentUser: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Add new Income to user's Incomes
    currentUser.incomes.push(savedIncome._id);

    // Save updated user document
    await currentUser.save();

    // Return success response
    return res.status(201).json({ success: true, income: savedIncome });
  } catch (error) {
    console.error("Error creating income:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export default incomeHandler;
