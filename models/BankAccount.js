const mongoose = require("mongoose");

// Define bank account schema
const bankAccountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  lastSync: {
    type: Date,
    default: Date.now,
  },
});

// Create or retrieve BankAccount model
const BankAccount =
  mongoose.models.BankAccount ||
  mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
