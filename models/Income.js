const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  date: Date,
  note: String,
  invoiceUrl: String,
  tags: [String],
});

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

module.exports = Income;
