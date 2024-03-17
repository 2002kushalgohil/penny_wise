import mongoose, { Document, Schema, Model } from "mongoose";

// Define bank account schema
export interface BankAccountDocument extends Document {
  bankName: string;
  accountNumber: string;
  balance: number;
  lastSync: Date;
}

const bankAccountSchema = new Schema<BankAccountDocument>({
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true, // Ensure account numbers are unique
  },
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
  lastSync: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Create or retrieve BankAccount model
const BankAccountModel: Model<BankAccountDocument> =
  mongoose.models.BankAccount ||
  mongoose.model<BankAccountDocument>("BankAccount", bankAccountSchema);

export default BankAccountModel;
