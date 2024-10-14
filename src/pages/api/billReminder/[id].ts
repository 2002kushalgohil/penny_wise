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
    const { method } = req;
    const userId = req.user?._id;
    const { id } = req.query;

    // Check if user has access to the bill reminder
    const isAllowed = req.user?.billReminders.some(
      (reminderId) => reminderId.toString() === id
    );
    if (!isAllowed) {
      return res
        .status(401)
        .json({ success: false, error: "Bill Reminder Not Found" });
    }

    try {
      switch (method) {
        case "GET":
          return await handleGetBillReminder(userId, id, res);
        case "PUT":
          return await handleUpdateBillReminder(id, req.body, res);
        case "DELETE":
          return await handleDeleteBillReminder(id, res);
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
  }
);

const handleGetBillReminder = async (
  userId: string | undefined,
  billReminderId: string | string[] | undefined,
  res: NextApiResponse
) => {
  const user: UserDocument | null = await User.findById(userId).populate(
    "billReminders"
  );
  if (!user)
    return res.status(404).json({ success: false, error: "User not found" });

  const billReminder = user.billReminders.find(
    (reminder) => reminder._id.toString() === billReminderId
  );
  if (!billReminder)
    return res
      .status(404)
      .json({ success: false, error: "Bill reminder not found" });

  return res.status(200).json({ success: true, billReminder });
};

const handleUpdateBillReminder = async (
  billReminderId: string | string[] | undefined,
  billReminderData: BillReminderDocument,
  res: NextApiResponse
) => {
  const { name, dueDate, amount, frequency, reminderPreferences } =
    billReminderData;

  // Validate required fields
  if (!name || !dueDate || !amount || !frequency || !reminderPreferences) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  const updatedBillReminder = await BillReminder.findByIdAndUpdate(
    billReminderId,
    billReminderData,
    { new: true }
  );
  if (!updatedBillReminder)
    return res
      .status(404)
      .json({ success: false, error: "Bill reminder not found" });

  return res.status(200).json({ success: true, updatedBillReminder });
};

const handleDeleteBillReminder = async (
  billReminderId: string | string[] | undefined,
  res: NextApiResponse
) => {
  const deletedBillReminder = await BillReminder.findByIdAndDelete(
    billReminderId
  );
  if (!deletedBillReminder)
    return res
      .status(404)
      .json({ success: false, error: "Bill reminder not found" });

  await User.updateOne(
    { billReminders: billReminderId },
    { $pull: { billReminders: billReminderId } }
  );
  return res
    .status(200)
    .json({ success: true, message: "Bill reminder deleted successfully" });
};

export default billReminderHandler;
