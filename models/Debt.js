const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema({
  id: String,
  name: String,
  balance: Number,
  interestRate: Number,
  minimumPayment: Number,
  paymentDueDate: Date,
  notes: String,
});

const Debt = mongoose.models.Debt || mongoose.model("Debt", debtSchema);

module.exports = Debt;
