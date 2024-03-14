const mongoose = require("mongoose");

const billReminderSchema = new mongoose.Schema({
  id: String,
  name: String,
  dueDate: Date,
  amount: Number,
  frequency: String,
  reminderPreferences: {
    email: Boolean,
    pushNotifications: Boolean,
    SMS: Boolean,
  },
});

const BillReminder =
  mongoose.models.BillReminder ||
  mongoose.model("BillReminder", billReminderSchema);

module.exports = BillReminder;
