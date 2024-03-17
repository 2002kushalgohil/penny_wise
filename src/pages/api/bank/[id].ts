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
  // Extract necessary information from the request
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  // Ensure user is authorized to access the bank account
  const isAllowed = req.user?.bankAccounts.find(
    (accountId) => accountId.toString() === id
  );

  // Check if user is allowed to access the bank account
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
    // Find user by ID and populate bank accounts
    const user: UserDocument | null = await User.findById(userId).populate(
      "bankAccounts"
    );

    // Return error if user not found
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find bank account in user's bank accounts array
    const bankAccount = user.bankAccounts.find(
      (account) => account._id.toString() === bankAccountId
    );

    // Return bank account information
    return res.status(200).json({ success: true, bankAccount });
  } catch (error) {
    // Handle any errors occurred during fetching bank account
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
    // Extract necessary fields from request body
    const { bankName, accountNumber, balance, lastSync }: BankAccountDocument =
      requestBody;

    // Check if required fields are provided
    if (!bankId || !bankName || !accountNumber || !balance || !lastSync) {
      return res.status(400).json({
        success: false,
        error: "Please fill all the details",
      });
    }

    // Update the bank account and get the updated document
    const updatedBankAccount = await BankAccount.findByIdAndUpdate(
      bankId,
      requestBody,
      { new: true }
    );

    // Return error if bank account not found
    if (!updatedBankAccount) {
      return res
        .status(404)
        .json({ success: false, error: "Bank account not found" });
    }

    // Return success response with updated bank account information
    return res.status(200).json({ success: true, updatedBankAccount });
  } catch (error) {
    // Handle any errors occurred during updating bank account
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
    // Delete the bank account
    const deletedBankAccount = await BankAccount.findByIdAndDelete(accountId);

    // Return error if bank account not found
    if (!deletedBankAccount) {
      return res
        .status(404)
        .json({ success: false, error: "Bank account not found" });
    }

    // Remove the bank account ID from user's bank accounts array
    await User.updateOne(
      { bankAccounts: accountId },
      { $pull: { bankAccounts: accountId } }
    );

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Bank account deleted successfully" });
  } catch (error) {
    // Handle any errors occurred during deleting bank account
    console.error("Error deleting bank account:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete bank account" });
  }
}

// Export the handler function
export default userBankAccountsHandler;
