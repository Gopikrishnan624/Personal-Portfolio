const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure nodemailer with Mailtrap
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4afb61c8e7eb3c", // Replace with your Mailtrap credentials
    pass: "9abe65b492b8cf", // Replace with your Mailtrap credentials
  },
});

// Handle POST request to /send-email
app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email, // Sender email
    to: "gopikrishnan1175@gmail.com", // Receiver email
    subject: subject, // Email subject
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Message sent: " + info.response);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});