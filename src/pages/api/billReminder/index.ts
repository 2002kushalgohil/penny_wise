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

const billReminderHandler = withAuth(async function (
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
        return handleGetBillReminders(userId, res);

      case "POST":
        return handleCreateBillReminder(userId, req.body, res);

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

async function handleGetBillReminders(userId: string, res: NextApiResponse) {
  try {
    // Find bill reminders belonging to the user
    const currentUser: UserDocument | null = await User.findById(
      userId
    ).populate("billReminders");

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Return user's bill reminders
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
    // Destructure necessary fields from billReminderData
    const {
      name,
      dueDate,
      amount,
      frequency,
      reminderPreferences,
    }: BillReminderDocument = billReminderData;

    // Check if required fields are provided
    if (!name || !dueDate || !amount || !frequency || !reminderPreferences) {
      return res.status(400).json({
        success: false,
        error: "All fields are required for creating a bill reminder",
      });
    }

    // Create new bill reminder
    const newBillReminder: BillReminderDocument = new BillReminder(
      billReminderData
    );

    // Save new bill reminder
    const savedBillReminder = await newBillReminder.save();

    // Find user
    const currentUser: UserDocument | null = await User.findById(userId);

    // Handle user not found
    if (!currentUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Add new bill reminder to user's bill reminders
    currentUser.billReminders.push(savedBillReminder._id);

    // Save updated user document
    await currentUser.save();

    // Return success response
    return res
      .status(201)
      .json({ success: true, billReminder: savedBillReminder });
  } catch (error) {
    console.error("Error creating bill reminder:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export default billReminderHandler;
