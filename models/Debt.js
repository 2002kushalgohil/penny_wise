const mongoose = require("mongoose");

// Define debt schema
const debtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  minimumPayment: {
    type: Number,
    required: true,
  },
  paymentDueDate: {
    type: Date,
    required: true,
  },
  notes: String,
});

// Create or retrieve Debt model
const Debt = mongoose.models.Debt || mongoose.model("Debt", debtSchema);

module.exports = Debt;
