import mongoose, { Document, Schema, Model } from "mongoose";

// Define financial goal document interface
export interface FinancialGoalDocument extends Document {
  name: string;
  targetAmount: number;
  targetDate: Date;
  currentAmount?: number;
  completed?: boolean;
  notes?: string;
}

const financialGoalSchema = new Schema<FinancialGoalDocument>({
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  targetDate: { type: Date, required: true },
  currentAmount: { type: Number, default: 0 }, // Optional field with default value
  completed: { type: Boolean, default: false }, // Optional field with default value
  notes: { type: String, required: false }, // Optional field
});

// Create or retrieve FinancialGoal model
const FinancialGoalModel: Model<FinancialGoalDocument> =
  mongoose.models.FinancialGoal ||
  mongoose.model<FinancialGoalDocument>("FinancialGoal", financialGoalSchema);

export default FinancialGoalModel;
