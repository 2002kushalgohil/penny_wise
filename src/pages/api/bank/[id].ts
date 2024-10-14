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

const userBankAccountsHandler = withAuth(async function (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  // Check user access to the bank account
  const isAllowed = req.user?.bankAccounts.find(
    (accountId) => accountId.toString() === id
  );

  if (!isAllowed) {
    return res
      .status(401)
      .json({ success: false, error: "Bank Account Not Found" });
  }

  try {
    switch (method) {
      case "GET":
        return handleGetBankAccount(userId, id, res);
      case "PUT":
        return handleEditBankAccount(id, req.body, res);
      case "DELETE":
        return handleDeleteBankAccount(id, res);
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

async function handleGetBankAccount(
  userId: string | undefined,
  bankAccountId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    const user: UserDocument | null = await User.findById(userId).populate(
      "bankAccounts"
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const bankAccount = user.bankAccounts.find(
      (account) => account._id.toString() === bankAccountId
    );

    return res.status(200).json({ success: true, bankAccount });
  } catch (error) {
    console.error("Error fetching user bank accounts:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user bank accounts" });
  }
}

async function handleEditBankAccount(
  bankId: string | string[] | undefined,
  requestBody: any,
  res: NextApiResponse
) {
  try {
    const { bankName, accountNumber, balance, lastSync }: BankAccountDocument =
      requestBody;

    if (!bankId || !bankName || !accountNumber || !balance || !lastSync) {
      return res
        .status(400)
        .json({ success: false, error: "Please fill all the details" });
    }

    const updatedBankAccount = await BankAccount.findByIdAndUpdate(
      bankId,
      requestBody,
      { new: true }
    );

    if (!updatedBankAccount) {
      return res
        .status(404)
        .json({ success: false, error: "Bank account not found" });
    }

    return res.status(200).json({ success: true, updatedBankAccount });
  } catch (error) {
    console.error("Error updating bank account:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update bank account" });
  }
}

async function handleDeleteBankAccount(
  accountId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    const deletedBankAccount = await BankAccount.findByIdAndDelete(accountId);

    if (!deletedBankAccount) {
      return res
        .status(404)
        .json({ success: false, error: "Bank account not found" });
    }

    await User.updateOne(
      { bankAccounts: accountId },
      { $pull: { bankAccounts: accountId } }
    );

    return res
      .status(200)
      .json({ success: true, message: "Bank account deleted successfully" });
  } catch (error) {
    console.error("Error deleting bank account:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete bank account" });
  }
}

// Export the handler function
export default userBankAccountsHandler;
