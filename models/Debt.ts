import mongoose, { Document, Schema, Model } from "mongoose";

// Define debt schema
export interface DebtDocument extends Document {
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  paymentDueDate: Date;
  notes?: string;
}

const debtSchema = new Schema<DebtDocument>({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  minimumPayment: {
    type: Number,
    required: true,
  },
  paymentDueDate: {
    type: Date,
    required: true,
  },
  notes: String,
});

// Create or retrieve Debt model
const DebtModel: Model<DebtDocument & Document> =
  mongoose.models.Debt ||
  mongoose.model<DebtDocument & Document>("Debt", debtSchema);

export default DebtModel;
