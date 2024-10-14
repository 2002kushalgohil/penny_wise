import mongoose, { Document, Schema, Model } from "mongoose";

// Define expense document interface
export interface ExpenseDocument extends Document {
  type: string;
  source: string;
  amount: number;
  date: Date;
  note?: string;
  invoiceUrl?: string;
  tags?: string[];
}

const expenseSchema = new Schema<ExpenseDocument>({
  type: { type: String, required: true },
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  note: { type: String, required: false }, // Optional field
  invoiceUrl: { type: String, required: false }, // Optional field
  tags: { type: [String], required: false }, // Optional array of tags
});

// Create or retrieve Expense model
const ExpenseModel: Model<ExpenseDocument> =
  mongoose.models.Expense ||
  mongoose.model<ExpenseDocument>("Expense", expenseSchema);

export default ExpenseModel;
