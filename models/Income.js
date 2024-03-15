const mongoose = require("mongoose");

// Define income schema
const incomeSchema = new mongoose.Schema({
  source: {
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
  invoiceUrl: String,
  tags: [String],
});

// Create or retrieve Income model
const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

module.exports = Income;
