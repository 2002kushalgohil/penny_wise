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

// Connect to the database only if not already connected
dbConnect();

const createOrGetBankHandler = withAuth(async function (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  try {
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
    const currentUser: UserDocument | null = await User.findById(
      userId
    ).populate("bankAccounts");

    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

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
    const { bankName, accountNumber, balance, lastSync } = bankAccountData;

    if (!bankName || !accountNumber || !balance || !lastSync) {
      return res.status(400).json({
        success: false,
        error:
          "All fields are required: bankName, accountNumber, balance, lastSync",
      });
    }

    const existingBankAccount = await BankAccount.findOne({ accountNumber });

    if (existingBankAccount) {
      return res.status(400).json({
        success: false,
        error: "Bank account with the same number already exists",
      });
    }

    const newBankAccount: BankAccountDocument = new BankAccount(
      bankAccountData
    );
    const savedBankAccount = await newBankAccount.save();

    const currentUser: UserDocument | null = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    currentUser.bankAccounts.push(savedBankAccount._id);
    await currentUser.save();

    return res.status(201).json({ success: true, savedBankAccount });
  } catch (error) {
    console.error("Error creating bank account:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export default createOrGetBankHandler;
