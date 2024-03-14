const mongoose = require("mongoose");

const financialGoalSchema = new mongoose.Schema({
  name: String,
  targetAmount: Number,
  currentAmount: Number,
  targetDate: Date,
  completed: Boolean,
  notes: String,
});

const FinancialGoal =
  mongoose.models.FinancialGoal ||
  mongoose.model("FinancialGoal", financialGoalSchema);

module.exports = FinancialGoal;
