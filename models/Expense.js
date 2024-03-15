const mongoose = require("mongoose");

// Define expense schema
const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: String,
  receiptUrl: String,
  location: String,
  paymentMethod: String,
  tags: [String],
});

// Create or retrieve Expense model
const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

module.exports = Expense;
