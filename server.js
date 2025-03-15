const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Nodemailer configuration for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gopikrishnan1175@gmail.com", // Replace with your Gmail address
    pass: "Gopi060403", // Replace with your Gmail app password
  },
});

// Route to handle form submission
app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: "your-email@gmail.com", // Sender email (must match the auth user)
    to: "gopikrishnan1175@gmail.com", // Receiver email
    subject: subject, // Email subject
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send message. Please try again.");
    }
    console.log("Message sent:", info.response);
    res.status(200).send("Message sent successfully!");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});