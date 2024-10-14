import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import BillReminder, {
  BillReminderDocument,
} from "../../../../models/BillReminder";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const billReminderHandler = withAuth(
  async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    const userId = req.user?._id;

    try {
      if (!userId) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
      }

      // Handle different HTTP methods
      switch (req.method) {
        case "GET":
          return handleGetBillReminders(userId, res);

        case "POST":
          return handleCreateBillReminder(userId, req.body, res);

        default:
          return res
            .status(405)
            .json({ success: false, error: "Method not allowed" });
      }
    } catch (error) {
      console.error("Error in bill reminder handler:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
);

async function handleGetBillReminders(userId: string, res: NextApiResponse) {
  try {
    const currentUser: UserDocument | null = await User.findById(userId)
      .populate("billReminders")
      .lean();

    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, billReminders: currentUser.billReminders });
  } catch (error) {
    console.error("Error fetching user bill reminders:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch user bill reminders" });
  }
}

async function handleCreateBillReminder(
  userId: string,
  billReminderData: BillReminderDocument,
  res: NextApiResponse
) {
  try {
    const { name, dueDate, amount, frequency, reminderPreferences } =
      billReminderData;

    if (!name || !dueDate || !amount || !frequency || !reminderPreferences) {
      return res.status(400).json({
        success: false,
        error: "All fields are required for creating a bill reminder",
      });
    }

    const newBillReminder = await new BillReminder(billReminderData).save();

    const currentUser = await User.findByIdAndUpdate(
      userId,
      { $push: { billReminders: newBillReminder._id } },
      { new: true, runValidators: true }
    );

    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return success response
    return res
      .status(201)
      .json({ success: true, billReminder: newBillReminder });
  } catch (error) {
    console.error("Error creating bill reminder:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export default billReminderHandler;
