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

// Utility function to send error responses
function sendErrorResponse(
  res: NextApiResponse,
  statusCode: number,
  message: string
) {
  return res.status(statusCode).json({ success: false, error: message });
}

// Validate email format
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default async function contactUsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return sendErrorResponse(res, 405, "Method not allowed");
  }

  try {
    const {
      name,
      email,
      company,
      subject,
      message,
    }: Partial<ContactUsRequest> = req.body;

    // Validate required fields
    if (!name || !email || !company || !subject || !message) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return sendErrorResponse(res, 400, "Invalid email format");
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
          <p><strong>Name:</strong> ${escapeHTML(contactInfo.name)}</p>
          <p><strong>Email:</strong> ${escapeHTML(contactInfo.email)}</p>
          <p><strong>Company:</strong> ${escapeHTML(contactInfo.company)}</p>
          <p><strong>Subject:</strong> ${escapeHTML(contactInfo.subject)}</p>
          <p><strong>Message:</strong> ${escapeHTML(contactInfo.message)}</p>
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
    console.error("Error while submitting contact form:", error);
    return sendErrorResponse(res, 500, "Internal server error");
  }
}

// Escape HTML function to prevent XSS
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
