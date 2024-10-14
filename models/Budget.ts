import mongoose, { Document, Schema, Model } from "mongoose";

// Define budget document interface
export interface BudgetDocument extends Document {
  type: string;
  budget: number;
  timeSpan: Date;
}

const budgetSchema = new Schema<BudgetDocument>({
  type: { type: String, required: true },
  budget: { type: Number, required: true },
  timeSpan: { type: Date, required: true },
});

// Create or retrieve Budget model
const BudgetModel: Model<BudgetDocument> =
  mongoose.models.Budget ||
  mongoose.model<BudgetDocument>("Budget", budgetSchema);

export default BudgetModel;
