import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import ContactUs from "../../../../models/Contact";
import emailSender from "../../../../utils/emailSender";
import { EMAIL_FROM } from "../../../../config/config";

// Connect to the database
dbConnect();

interface ContactUsRequest {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export default async function contactUsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { name, email, company, subject, message }: ContactUsRequest =
      req.body;

    // Validate required fields
    if (!name || !email || !company || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Create new contact form submission
    const contactInfo = await ContactUs.create({
      name,
      email,
      company,
      subject,
      message,
    });

    // Construct HTML email template
    const htmlTemplate = `
      <html>
        <head>
          <title>Contact Form Submission</title>
        </head>
        <body>
          <h2>Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactInfo.name}</p>
          <p><strong>Email:</strong> ${contactInfo.email}</p>
          <p><strong>Company:</strong> ${contactInfo.company}</p>
          <p><strong>Subject:</strong> ${contactInfo.subject}</p>
          <p><strong>Message:</strong> ${contactInfo.message}</p>
        </body>
      </html>
    `;

    // Send email with user information
    await emailSender({
      email: EMAIL_FROM || "",
      subject: "Penny Wise: New Contact Form Submission",
      message: htmlTemplate,
    });

    return res.status(200).json({
      success: true,
      message: "Thank you for contacting us! We will contact you soon.",
    });
  } catch (error) {
    // Handle errors
    console.error("Error while submitting contact form:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
