const nodemailer = require("nodemailer");

const emailSender = async (options) => {
  // Validate required options
  if (!options || !options.email || !options.subject || !options.message) {
    throw new Error("Email, subject, and message are required");
  }

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Compose email message
    const message = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    // Send email
    await transporter.sendMail(message);
  } catch (error) {
    // Log and re-throw any errors that occur during sending
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = emailSender;
