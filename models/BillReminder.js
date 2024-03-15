const mongoose = require("mongoose");

// Define bill reminder schema
const billReminderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  reminderPreferences: {
    email: {
      type: Boolean,
      default: false,
    },
    pushNotifications: {
      type: Boolean,
      default: false,
    },
    SMS: {
      type: Boolean,
      default: false,
    },
  },
});

// Create or retrieve BillReminder model
const BillReminder =
  mongoose.models.BillReminder ||
  mongoose.model("BillReminder", billReminderSchema);

module.exports = BillReminder;
