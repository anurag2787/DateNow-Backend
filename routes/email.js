const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")

router.post('/', async (req, res) => {
    const { email, text, displayName } = req.body;

    if (!email || !text || !displayName) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '"DateNow" <'+ process.env.EMAIL_FROM +'>',
            to: email,
            bcc: process.env.EMAIL_BCC,
            subject: "Thank You for Contacting DateNow!",
            html: `Hello ${displayName},

Thank you for reaching out to us at DateNow! We have received your message and appreciate you taking the time to connect with us.

Our team will review your inquiry and get back to you as soon as possible. If your matter is urgent, feel free to reply to this email for quicker assistance.

Your Submitted Details:
- Name: ${displayName}
- Email: ${email}
- Message: ${text}

We appreciate your interest in DateNow and look forward to assisting you.

Best Regards,
The DateNow Team
https://datenow.vercel.app

If you wish to unsubscribe, please reply with "UNSUBSCRIBE".`,
            html: `<p>Hello <b>${displayName}</b>,</p>
<p>Thank you for reaching out to us at <b>DateNow</b>! We have received your message and appreciate you taking the time to connect with us.</p>
<p>Our team will review your inquiry and get back to you as soon as possible. If your matter is urgent, feel free to reply to this email for quicker assistance.</p>
<p><b>Your Submitted Details:</b></p>
<ul>
    <li><b>Name:</b> ${displayName}</li>
    <li><b>Email:</b> ${email}</li>
    <li><b>Message:</b> ${text}</li>
</ul>
<p>We appreciate your interest in DateNow and look forward to assisting you.</p>
<p>Best Regards,<br>The <b>DateNow</b> Team<br><a href="https://datenow.vercel.app">https://datenow.vercel.app</a></p>
<hr>
<p>If you wish to <b>unsubscribe</b>, please reply with "<b>UNSUBSCRIBE</b>".</p>`
        });

        console.log("Message sent: %s", info.messageId);
        res.json({ message: "Email sent successfully!", messageId: info.messageId });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
});

module.exports = router;
