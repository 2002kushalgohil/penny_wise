const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  type: String,
  budget: Number,
  timeSpan: String,
});

const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

module.exports = Budget;
