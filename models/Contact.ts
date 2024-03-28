import mongoose, { Document, Schema, Model } from "mongoose";

// Define contact us schema
export interface ContactUsDocument extends Document {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  submittedAt: Date;
}

const contactUsSchema = new Schema<ContactUsDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Create or retrieve ContactUs model
const ContactUsModel: Model<ContactUsDocument & Document> =
  mongoose.models.ContactUs ||
  mongoose.model<ContactUsDocument & Document>("ContactUs", contactUsSchema);

export default ContactUsModel;
