const mongoose = require("mongoose");

// Define budget schema
const budgetSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  timeSpan: {
    type: String,
    required: true,
  },
});

// Create or retrieve Budget model
const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

module.exports = Budget;
