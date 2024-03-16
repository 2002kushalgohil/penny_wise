import dbConnect from "../../../../utils/db";
import BankAccount from "../../../../models/BankAccount";
import { withAuth } from "../../../../middlewares/auth";

// Connect to the database
dbConnect();

export default withAuth(async function createBankHandler(req, res) {
  // Ensure only POST requests are accepted
  if (req.method === "POST") {
    const { bankName, accountNumber, balance, lastSync } = req.body;

    try {
      if (!bankName || !accountNumber) {
        return res
          .status(400)
          .json({ message: "Bank name and account number are required" });
      }

      const newBankAccount = new BankAccount({
        bankName,
        accountNumber,
        balance,
        lastSync,
      });

      // Save the new bank account
      await newBankAccount.save();

      // Find the current user (assuming you have a way to get the user from the request)
      const currentUser = req.user; // Assuming req.user contains the current user's information

      // Add the new bank account to the user's bank accounts array
      currentUser.bankAccounts.push(newBankAccount._id);

      // Save the updated user document
      await currentUser.save();

      res.status(201).json(newBankAccount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Handle invalid HTTP method
  return res.status(405).json({ message: "Method not allowed" });
});
