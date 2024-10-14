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
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  const isAllowed = req.user?.debts.find((debtId) => debtId.toString() === id);

  if (!isAllowed) {
    return res.status(401).json({ success: false, error: "Debt Not Found" });
  }

  try {
    switch (method) {
      case "GET":
        return handleGetDebt(userId, id, res);

      case "PUT":
        return handleUpdateDebt(id, req.body, res);

      case "DELETE":
        return handleDeleteDebt(id, res);

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

async function handleGetDebt(
  userId: string | undefined,
  debtId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    const user: UserDocument | null = await User.findById(userId).populate(
      "debts"
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const debt = user.debts.find((debt) => debt._id.toString() === debtId);

    return res.status(200).json({ success: true, debt });
  } catch (error) {
    console.error("Error fetching debt:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch debt" });
  }
}

async function handleUpdateDebt(
  debtId: string | string[] | undefined,
  debtData: DebtDocument,
  res: NextApiResponse
) {
  try {
    const {
      name,
      balance,
      interestRate,
      minimumPayment,
      paymentDueDate,
    }: DebtDocument = debtData;

    if (
      !name ||
      !balance ||
      !interestRate ||
      !minimumPayment ||
      !paymentDueDate
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const updatedDebt = await Debt.findOneAndUpdate({ _id: debtId }, debtData, {
      new: true,
    });

    if (!updatedDebt) {
      return res.status(404).json({ success: false, error: "Debt not found" });
    }

    return res.status(200).json({ success: true, updatedDebt });
  } catch (error) {
    console.error("Error updating debt:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update debt" });
  }
}

async function handleDeleteDebt(
  debtId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    const deletedDebt = await Debt.findByIdAndDelete(debtId);

    if (!deletedDebt) {
      return res.status(404).json({ success: false, error: "Debt not found" });
    }

    await User.updateOne({ debts: debtId }, { $pull: { debts: debtId } });

    return res
      .status(200)
      .json({ success: true, message: "Debt deleted successfully" });
  } catch (error) {
    console.error("Error deleting debt:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete debt" });
  }
}

export default debtHandler;
