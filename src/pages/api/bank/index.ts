import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import BankAccount, {
  BankAccountDocument,
} from "../../../../models/BankAccount";
import User, { UserDocument } from "../../../../models/User";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";

// Connect to the database
dbConnect();

const createOrGetBankHandler = withAuth(async function (
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
        return handleGetBankAccounts(userId, res);

      case "POST":
        return handleCreateBankAccount(userId, req.body, res);

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

async function handleGetBankAccounts(userId: string, res: NextApiResponse) {
  try {
    // Find user and populate bank accounts
    const currentUser: UserDocument | null = await User.findById(
      userId
    ).populate("bankAccounts");

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's bank accounts
    return res
      .status(200)
      .json({ success: true, bankAccounts: currentUser.bankAccounts });
  } catch (error) {
    console.error("Error fetching user bank accounts:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user bank accounts" });
  }
}

async function handleCreateBankAccount(
  userId: string,
  bankAccountData: BankAccountDocument,
  res: NextApiResponse
) {
  try {
    // Check if required fields are provided
    const { bankName, accountNumber, balance, lastSync }: BankAccountDocument =
      bankAccountData;
    if (!bankName || !accountNumber || !balance || !lastSync) {
      return res.status(400).json({
        success: false,
        error:
          "Bank name, account number, balance, and last sync date are required",
      });
    }

    // Check if the bank account number already exists for the user
    const existingBankAccount = await BankAccount.findOne({
      accountNumber: accountNumber,
    });

    if (existingBankAccount) {
      return res.status(400).json({
        success: false,
        error: "Bank account with the same number already exists",
      });
    }

    // Create new bank account
    const newBankAccount: BankAccountDocument = new BankAccount(
      bankAccountData
    );

    // Save new bank account
    const savedBankAccount = await newBankAccount.save();

    // Find user
    const currentUser: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Add new bank account to user's bank accounts
    currentUser.bankAccounts.push(savedBankAccount._id);

    // Save updated user document
    await currentUser.save();

    // Return success response
    return res.status(201).json({ success: true, savedBankAccount });
  } catch (error) {
    console.error("Error creating bank account:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export default createOrGetBankHandler;
