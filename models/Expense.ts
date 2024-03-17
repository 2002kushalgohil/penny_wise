import mongoose, { Document, Schema, Model } from "mongoose";

// Define expense schema
export interface ExpenseDocument extends Document {
  category: string;
  amount: number;
  date: Date;
  note?: string;
  receiptUrl?: string;
  location?: string;
  paymentMethod?: string;
  tags?: string[];
}

const expenseSchema = new Schema<ExpenseDocument>({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: String,
  receiptUrl: String,
  location: String,
  paymentMethod: String,
  tags: [String],
});

// Create or retrieve Expense model
const ExpenseModel: Model<ExpenseDocument & Document> =
  mongoose.models.Expense ||
  mongoose.model<ExpenseDocument & Document>("Expense", expenseSchema);

export default ExpenseModel;
