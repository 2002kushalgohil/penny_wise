const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: Date,
  note: String,
  receiptUrl: String,
  location: String,
  paymentMethod: String,
  tags: [String],
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

module.exports = Expense;
