import mongoose, { Document, Schema, Model } from "mongoose";

// Define financial goal schema
export interface FinancialGoalDocument extends Document {
  name: string;
  targetAmount: number;
  targetDate: Date;
  currentAmount?: number;
  completed?: boolean;
  notes?: string;
}

const financialGoalSchema = new Schema<FinancialGoalDocument>({
  name: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  notes: String,
});

// Create or retrieve FinancialGoal model
const FinancialGoalModel: Model<FinancialGoalDocument & Document> =
  mongoose.models.FinancialGoal ||
  mongoose.model<FinancialGoalDocument & Document>(
    "FinancialGoal",
    financialGoalSchema
  );

export default FinancialGoalModel;
