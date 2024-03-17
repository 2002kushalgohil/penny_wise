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
  // Extract necessary information from the request
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  // Ensure user is authorized to access the incomes
  const isAllowed = req.user?.incomes.find(
    (incomeId) => incomeId.toString() === id
  );

  // Check if user is allowed to access the incomes
  if (!isAllowed) {
    return res.status(401).json({ success: false, error: "Income Not Found" });
  }

  try {
    switch (method) {
      case "GET":
        return handleGetIncome(userId, id, res);

      case "PUT":
        return handleUpdateIncome(id, req.body, res);

      case "DELETE":
        return handleDeleteIncome(id, res);

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

async function handleGetIncome(
  userId: string | undefined,
  incomeId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    // Find user by ID and populate income
    const user: UserDocument | null = await User.findById(userId).populate(
      "incomes"
    );

    // Return error if user not found
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find income in user's incomes array
    const income = user.incomes.find(
      (income) => income._id.toString() === incomeId
    );

    // Return income information
    return res.status(200).json({ success: true, income });
  } catch (error) {
    console.error("Error fetching income:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch income" });
  }
}

async function handleUpdateIncome(
  incomeId: string | string[] | undefined,
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
        error:
          "Type, Source, amount, and date are required for creating an income",
      });
    }

    // Update the income and get the updated document
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: incomeId },
      incomeData,
      { new: true }
    );

    // Return error if income not found
    if (!updatedIncome) {
      return res
        .status(404)
        .json({ success: false, error: "Income not found" });
    }

    // Return success response with updated income information
    return res.status(200).json({ success: true, updatedIncome });
  } catch (error) {
    // Handle any errors occurred during updating income
    console.error("Error updating income:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update income" });
  }
}

async function handleDeleteIncome(
  incomeId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    // Delete the income
    const deletedIncome = await Income.findByIdAndDelete(incomeId);

    // Return error if income not found
    if (!deletedIncome) {
      return res
        .status(404)
        .json({ success: false, error: "Income not found" });
    }

    // Remove the income ID from user's incomes array
    await User.updateOne(
      { incomes: incomeId },
      { $pull: { incomes: incomeId } }
    );

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete income" });
  }
}

export default incomeHandler;
