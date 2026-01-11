const sendEmail = require("../utils/emailService");

exports.submitContactForm = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    const adminHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${message}</p>
    `;

    await sendEmail({
      email: "methsarabooks@gmail.com", // Admin email
      subject: `New Contact Message: ${subject} - ${name}`,
      html: adminHtml,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};
