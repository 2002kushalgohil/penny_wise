const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema({
  bankName: String,
  accountNumber: String,
  balance: Number,
  lastSync: Date,
});

const BankAccount =
  mongoose.models.BankAccount ||
  mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
