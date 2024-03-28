import mongoose, { Document, Schema, Model } from "mongoose";

// Define email subscription schema
export interface EmailSubscriptionDocument extends Document {
  email: string;
  subscribedAt: Date;
}

const emailSubscriptionSchema = new Schema<EmailSubscriptionDocument>({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Create or retrieve EmailSubscription model
const EmailSubscriptionModel: Model<EmailSubscriptionDocument & Document> =
  mongoose.models.EmailSubscription ||
  mongoose.model<EmailSubscriptionDocument & Document>(
    "EmailSubscription",
    emailSubscriptionSchema
  );

export default EmailSubscriptionModel;
