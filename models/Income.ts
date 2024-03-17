import mongoose, { Document, Schema, Model } from "mongoose";

// Define income schema
export interface IncomeDocument extends Document {
  type: string;
  source: string;
  amount: number;
  date: Date;
  note?: string;
  invoiceUrl?: string;
  tags?: string[];
}

const incomeSchema = new Schema<IncomeDocument>({
  type: {
    type: String,
    required: true,
  },
  source: {
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
  invoiceUrl: String,
  tags: [String],
});

// Create or retrieve Income model
const IncomeModel: Model<IncomeDocument & Document> =
  mongoose.models.Income ||
  mongoose.model<IncomeDocument & Document>("Income", incomeSchema);

export default IncomeModel;
