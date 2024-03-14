const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  preferences: {
    currency: String,
    dateFormat: String,
    notificationPreferences: {
      email: Boolean,
      pushNotifications: Boolean,
      SMS: Boolean,
    },
  },
  personalInfo: {
    firstName: String,
    lastName: String,
    birthdate: Date,
    address: String,
    phoneNumber: String,
    avatarUrl: String,
  },
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
  premium: {
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
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
