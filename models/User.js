const mongoose = require("mongoose");

// Define preferences schema
const preferencesSchema = new mongoose.Schema({
  currency: String,
  dateFormat: String,
  notificationPreferences: {
    email: Boolean,
    pushNotifications: Boolean,
    SMS: Boolean,
  },
});

// Define personal info schema
const personalInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthdate: Date,
  address: String,
  phoneNumber: String,
  avatarUrl: String,
});

// Define premium schema
const premiumSchema = new mongoose.Schema({
  name: String,
  price: Number,
  billingCycle: String,
  features: [String],
  paymentDetails: {
    paymentMethod: String,
  },
  expireDate: Date,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  preferences: preferencesSchema,
  personalInfo: personalInfoSchema,
  bankAccounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "BankAccount" }],
  cash: {
    wallet: Number,
  },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }],
  budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }],
  financialGoals: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FinancialGoal" },
  ],
  billReminders: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BillReminder" },
  ],
  debts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Debt" }],
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  settings: {
    language: String,
    timezone: String,
  },
  premium: premiumSchema,
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
});

// Create or retrieve User model
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
