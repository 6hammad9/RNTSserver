require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Route to handle form submissions
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Log the form data to the console (for testing)
  console.log("Form Data Received:", { name, email, phone, message });

  // Email options
  const msg = {
    to: "muhammadnaseer@rnts.services", // Company email address
    from: "hammadnaseer2230@gmail.com", // Verified sender email in SendGrid
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    html: `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  // Send the email
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
      res.status(200).json({ message: "Form submitted successfully!" });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});