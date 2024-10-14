import mongoose, { Document, Schema, Model } from "mongoose";

// Define income document interface
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
  type: { type: String, required: true },
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  note: { type: String, required: false }, // Optional field
  invoiceUrl: { type: String, required: false }, // Optional field
  tags: { type: [String], required: false }, // Optional array of tags
});

// Create or retrieve Income model
const IncomeModel: Model<IncomeDocument> =
  mongoose.models.Income ||
  mongoose.model<IncomeDocument>("Income", incomeSchema);

export default IncomeModel;
