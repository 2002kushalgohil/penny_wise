import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import EmailSubscription, {
  EmailSubscriptionDocument,
} from "../../../../models/EmailSubscription";

// Connect to the database
dbConnect();

interface SubscribeRequest {
  email: string;
}

// Simple email validation function
function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export default async function subscribeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { email }: SubscribeRequest = req.body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, error: "A valid email is required" });
    }

    // Check if email is already subscribed
    const existingSubscription: EmailSubscriptionDocument | null =
      await EmailSubscription.findOne({ email });

    // If already subscribed, return conflict message
    if (existingSubscription) {
      return res
        .status(409)
        .json({ success: false, error: "You are already subscribed!" });
    } else {
      // If not subscribed, create a new subscription
      await EmailSubscription.create({ email });
      return res
        .status(201)
        .json({ success: true, message: "Thank you for subscribing!" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error while subscribing:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
