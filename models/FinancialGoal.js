const mongoose = require("mongoose");

// Define financial goal schema
const financialGoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  notes: String,
});

// Create or retrieve FinancialGoal model
const FinancialGoal =
  mongoose.models.FinancialGoal ||
  mongoose.model("FinancialGoal", financialGoalSchema);

module.exports = FinancialGoal;
