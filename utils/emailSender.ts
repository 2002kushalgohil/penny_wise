import nodemailer, { Transporter } from "nodemailer";
import {
  EMAIL_FROM,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from "../config/config";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const emailSender = async (options: EmailOptions): Promise<void> => {
  try {
    // Create a Nodemailer transporter
    const transporter: Transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Compose email message
    const message = {
      from: EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    // Send email
    await transporter.sendMail(message);

    // Log success
    console.log("Email sent successfully to:", options.email);
  } catch (error) {
    // Log and re-throw any errors that occur during sending
    console.error("Error sending email:", error);
    throw error;
  }
};

export default emailSender;
