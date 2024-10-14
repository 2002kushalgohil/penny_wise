import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import Debt, { DebtDocument } from "../../../../models/Debt";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const debtHandler = withAuth(async function (
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
        return handleGetDebts(userId, res);

      case "POST":
        return handleCreateDebt(userId, req.body, res);

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

async function handleGetDebts(userId: string, res: NextApiResponse) {
  try {
    // Find debts belonging to the user
    const currentUser: UserDocument | null = await User.findById(
      userId
    ).populate("debts");

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's debts
    return res.status(200).json({ success: true, debts: currentUser.debts });
  } catch (error) {
    console.error("Error fetching user debts:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user debts" });
  }
}

async function handleCreateDebt(
  userId: string,
  debtData: DebtDocument,
  res: NextApiResponse
) {
  try {
    // Destructure necessary fields from debtData
    const { name, balance, interestRate, minimumPayment, paymentDueDate } =
      debtData;

    // Check if required fields are provided
    if (
      !name ||
      !balance ||
      !interestRate ||
      !minimumPayment ||
      !paymentDueDate
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required for creating a debt",
      });
    }

    // Create new debt
    const newDebt = new Debt({
      name,
      balance,
      interestRate,
      minimumPayment,
      paymentDueDate,
    });

    // Save new debt
    const savedDebt = await newDebt.save();

    // Find user
    const currentUser: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Add new debt to user's debts
    currentUser.debts.push(savedDebt._id);
    await currentUser.save();

    // Return success response
    return res.status(201).json({ success: true, debt: savedDebt });
  } catch (error) {
    console.error("Error creating debt:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create debt" });
  }
}

export default debtHandler;
