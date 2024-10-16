import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import FinancialGoal, {
  FinancialGoalDocument,
} from "../../../../models/FinancialGoal";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

dbConnect();

const financialGoalHandler = withAuth(async function (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  const isAllowed = req.user?.financialGoals.find(
    (goalId) => goalId.toString() === id
  );

  if (!isAllowed) {
    return res
      .status(401)
      .json({ success: false, error: "Financial Goal Not Found" });
  }

  try {
    switch (method) {
      case "GET":
        return handleGetFinancialGoal(userId, id, res);

      case "PUT":
        return handleUpdateFinancialGoal(id, req.body, res);

      case "DELETE":
        return handleDeleteFinancialGoal(id, res);

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

async function handleGetFinancialGoal(
  userId: string | undefined,
  financialGoalId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    const user: UserDocument | null = await User.findById(userId).populate(
      "financialGoals"
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const financialGoal = user.financialGoals.find(
      (goal) => goal._id.toString() === financialGoalId
    );

    return res.status(200).json({ success: true, financialGoal });
  } catch (error) {
    console.error("Error fetching financial goal:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch financial goal" });
  }
}

async function handleUpdateFinancialGoal(
  financialGoalId: string | string[] | undefined,
  financialGoalData: FinancialGoalDocument,
  res: NextApiResponse
) {
  try {
    const { name, targetAmount, targetDate }: FinancialGoalDocument =
      financialGoalData;

    if (!name || !targetAmount || !targetDate) {
      return res.status(400).json({
        success: false,
        error:
          "Name, target amount, and target date are required for updating a financial goal",
      });
    }

    const updatedFinancialGoal = await FinancialGoal.findOneAndUpdate(
      { _id: financialGoalId },
      financialGoalData,
      { new: true }
    );

    if (!updatedFinancialGoal) {
      return res
        .status(404)
        .json({ success: false, error: "Financial goal not found" });
    }

    return res.status(200).json({ success: true, updatedFinancialGoal });
  } catch (error) {
    console.error("Error updating financial goal:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update financial goal" });
  }
}

async function handleDeleteFinancialGoal(
  financialGoalId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    const deletedFinancialGoal = await FinancialGoal.findByIdAndDelete(
      financialGoalId
    );

    if (!deletedFinancialGoal) {
      return res
        .status(404)
        .json({ success: false, error: "Financial goal not found" });
    }

    await User.updateOne(
      { financialGoals: financialGoalId },
      { $pull: { financialGoals: financialGoalId } }
    );

    return res
      .status(200)
      .json({ success: true, message: "Financial goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting financial goal:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete financial goal" });
  }
}

export default financialGoalHandler;
