import mongoose, { Document, Schema, Model } from "mongoose";

// Define preferences schema
export interface PreferencesDocument extends Document {
  currency: string;
  dateFormat: string;
  language: string;
  timezone: string;
  notificationPreferences: {
    email: boolean;
    pushNotifications: boolean;
    SMS: boolean;
  };
}

const preferencesSchema = new Schema<PreferencesDocument>({
  currency: String,
  dateFormat: String,
  language: String,
  timezone: String,
  notificationPreferences: {
    email: Boolean,
    pushNotifications: Boolean,
    SMS: Boolean,
  },
});

// Define personal info schema
export interface PersonalInfo extends Document {
  firstName: string;
  lastName: string;
  birthdate: Date;
  address: string;
  phoneNumber: string;
  avatarUrl: string;
}

const personalInfoSchema = new Schema<PersonalInfo>({
  firstName: String,
  lastName: String,
  birthdate: Date,
  address: String,
  phoneNumber: String,
  avatarUrl: String,
});

// Define premium schema
export interface PremiumDocument extends Document {
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
  paymentDetails: {
    paymentMethod: string;
    paymentId: string;
  };
  expireDate: Date;
  status: string;
  createdAt: Date;
}

const premiumSchema = new Schema<PremiumDocument>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  billingCycle: { type: String, required: true },
  features: { type: [String], required: true },
  paymentDetails: {
    paymentMethod: { type: String, required: true },
    paymentId: { type: String, required: true },
  },
  expireDate: { type: Date, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

// Define user schema
export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  preferences: PreferencesDocument;
  personalInfo: PersonalInfo;
  bankAccounts: mongoose.Types.ObjectId[];
  cash: {
    wallet: number;
  };
  expenses: mongoose.Types.ObjectId[];
  incomes: mongoose.Types.ObjectId[];
  budgets: mongoose.Types.ObjectId[];
  financialGoals: mongoose.Types.ObjectId[];
  billReminders: mongoose.Types.ObjectId[];
  debts: mongoose.Types.ObjectId[];
  createdAt: Date;
  lastLogin?: Date;
  premium: PremiumDocument;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
}

const userSchema = new Schema<UserDocument>({
  username: String,
  email: String,
  password: String,
  preferences: preferencesSchema,
  personalInfo: personalInfoSchema,
  bankAccounts: [{ type: Schema.Types.ObjectId, ref: "BankAccount" }],
  cash: {
    wallet: Number,
  },
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
  incomes: [{ type: Schema.Types.ObjectId, ref: "Income" }],
  budgets: [{ type: Schema.Types.ObjectId, ref: "Budget" }],
  financialGoals: [{ type: Schema.Types.ObjectId, ref: "FinancialGoal" }],
  billReminders: [{ type: Schema.Types.ObjectId, ref: "BillReminder" }],
  debts: [{ type: Schema.Types.ObjectId, ref: "Debt" }],
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  premium: premiumSchema,
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
});

// Create or retrieve User model
const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
