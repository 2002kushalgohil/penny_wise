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
  // Extract necessary information from the request
  const { method } = req;
  const userId = req.user?._id;
  const { id } = req.query;

  // Ensure user is authorized to access the bill reminder
  const isAllowed = req.user?.billReminders.find(
    (reminderId) => reminderId.toString() === id
  );

  // Check if user is allowed to access the bill reminder
  if (!isAllowed) {
    return res
      .status(401)
      .json({ success: false, error: "Bill Reminder Not Found" });
  }

  try {
    switch (method) {
      case "GET":
        return handleGetBillReminder(userId, id, res);

      case "PUT":
        return handleUpdateBillReminder(id, req.body, res);

      case "DELETE":
        return handleDeleteBillReminder(id, res);

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

async function handleGetBillReminder(
  userId: string | undefined,
  billReminderId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    // Find user by ID and populate bill reminder
    const user: UserDocument | null = await User.findById(userId).populate(
      "billReminders"
    );

    // Return error if user not found
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find bill reminder in user's bill reminders array
    const billReminder = user.billReminders.find(
      (reminder) => reminder._id.toString() === billReminderId
    );

    // Return bill reminder information
    return res.status(200).json({ success: true, billReminder });
  } catch (error) {
    console.error("Error fetching bill reminder:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch bill reminder" });
  }
}

async function handleUpdateBillReminder(
  billReminderId: string | string[] | undefined,
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
        error: "All fields are required",
      });
    }

    // Update the bill reminder and get the updated document
    const updatedBillReminder = await BillReminder.findOneAndUpdate(
      { _id: billReminderId },
      billReminderData,
      { new: true }
    );

    // Return error if bill reminder not found
    if (!updatedBillReminder) {
      return res
        .status(404)
        .json({ success: false, error: "Bill reminder not found" });
    }

    // Return success response with updated bill reminder information
    return res.status(200).json({ success: true, updatedBillReminder });
  } catch (error) {
    // Handle any errors occurred during updating bill reminder
    console.error("Error updating bill reminder:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update bill reminder" });
  }
}

async function handleDeleteBillReminder(
  billReminderId: string | string[] | undefined,
  res: NextApiResponse
) {
  try {
    // Delete the bill reminder
    const deletedBillReminder = await BillReminder.findByIdAndDelete(
      billReminderId
    );

    // Return error if bill reminder not found
    if (!deletedBillReminder) {
      return res
        .status(404)
        .json({ success: false, error: "Bill reminder not found" });
    }

    // Remove the bill reminder ID from user's bill reminders array
    await User.updateOne(
      { billReminders: billReminderId },
      { $pull: { billReminders: billReminderId } }
    );

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Bill reminder deleted successfully" });
  } catch (error) {
    console.error("Error deleting bill reminder:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete bill reminder" });
  }
}

export default billReminderHandler;
