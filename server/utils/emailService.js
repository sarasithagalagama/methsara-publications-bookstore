const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Check if env vars are loaded
  console.log("SMTP Config:", {
    host: process.env.SMTP_HOST || "UNDEFINED",
    port: process.env.SMTP_PORT || "UNDEFINED",
    email: process.env.SMTP_EMAIL || "UNDEFINED",
    user: process.env.SMTP_EMAIL || "UNDEFINED",
    pass: process.env.SMTP_PASSWORD ? "****" : "MISSING",
  });

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Prepare email options
  const message = {
    from: `${process.env.FROM_NAME || "Methsara Publications"} <${
      process.env.FROM_EMAIL || process.env.SMTP_EMAIL
    }>`,
    to: options.email,
    subject: options.subject,
    html: options.html || options.message,
    text: options.text, // Fallback plain text
  };

  // Send email
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
