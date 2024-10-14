import mongoose, { Document, Schema, Model } from "mongoose";

// Define debt document interface
export interface DebtDocument extends Document {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  paymentDueDate: Date;
  notes?: string;
}

const debtSchema = new Schema<DebtDocument>({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  minimumPayment: { type: Number, required: true },
  paymentDueDate: { type: Date, required: true },
  notes: { type: String, required: false }, // Explicitly define as optional
});

// Create or retrieve Debt model
const DebtModel: Model<DebtDocument> =
  mongoose.models.Debt || mongoose.model<DebtDocument>("Debt", debtSchema);

export default DebtModel;
