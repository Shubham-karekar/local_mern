const Contact = require("../models/contact-module"); 
const nodemailer = require("nodemailer");
require("dotenv").config();

const contactPage = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    if (!username || !email || !message) {
      console.log("Validation failed:", req.body);
      return res.status(400).json({ message: "All fields are required." });
    }

    const contact = await Contact.create({ username, email, message });
    console.log("Data saved:", contact);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL for secure connection
      auth: {
        user: process.env.EMAIL_USER, // Your email from .env
        pass: process.env.EMAIL_PASS, // Your app password from .env
      },
    });

    const userMailOptions = {
      from: `"Shubham Karekar👻" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Contacting Us! ✔",
      text: `Dear ${username},\n\nThank you for reaching out to us. We have received your message:\n\n"${message}"\n\nWe will get back to you soon!\n\nBest Regards,\nShubham Karekar`,
      html: `<p>Dear <strong>${username}</strong>,</p>
             <p>Thank you for reaching out to us. We have received your message:</p>
             <blockquote>${message}</blockquote>
             <p>We will get back to you soon!</p>
             <p>Best Regards,<br><strong>Shubham Karekar</strong></p>`,
    };

    const adminMailOptions = {
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission ✔",
      text: `Hello Admin,\n\nYou have received a new message from:\n\nName: ${username}\nEmail: ${email}\nMessage: "${message}"\n\nPlease respond accordingly.\n\nBest Regards,\nYour Website`,
      html: `<p><strong>New Contact Form Submission</strong></p>
             <p><strong>Name:</strong> ${username}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> <blockquote>${message}</blockquote></p>
             <p>Please respond accordingly.</p>
             <p><strong>Best Regards,<br>Your Website</strong></p>`,
    };

    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    console.log("Emails sent successfully!");
    return res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error in contactPage:", error);
    return res.status(500).json({ message: "Message not sent" });
  }
};

module.exports = { contactPage };