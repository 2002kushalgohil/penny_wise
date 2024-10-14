import mongoose, { Document, Schema, Model } from "mongoose";

// Define bill reminder document interface
export interface BillReminderDocument extends Document {
  name: string;
  dueDate: Date;
  amount: number;
  frequency: string;
  reminderPreferences: {
    email: boolean;
    pushNotifications: boolean;
    SMS: boolean;
  };
}

const billReminderSchema = new Schema<BillReminderDocument>({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, required: true },
  reminderPreferences: {
    email: { type: Boolean, default: false },
    pushNotifications: { type: Boolean, default: false },
    SMS: { type: Boolean, default: false },
  },
});

// Create or retrieve BillReminder model
const BillReminderModel: Model<BillReminderDocument> =
  mongoose.models.BillReminder ||
  mongoose.model<BillReminderDocument>("BillReminder", billReminderSchema);

export default BillReminderModel;
