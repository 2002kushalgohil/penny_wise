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
    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    // Check if email is already subscribed
    const existingSubscription: EmailSubscriptionDocument | null =
      await EmailSubscription.findOne({ email });

    // If already subscribed, return message
    if (existingSubscription) {
      return res
        .status(200)
        .json({ success: false, error: "You are already subscribed!" });
    } else {
      // If not subscribed, create new subscription
      await EmailSubscription.create({ email });
      return res
        .status(200)
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
