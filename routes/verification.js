const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
const generateOtp = require('../utils/otp.js')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const { email,username } = req.body;

    if (!email||!username) {
        throw new Error('Email is required');
    }

    const otp = generateOtp()

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '❤️ DateNow',
            to: email,
            subject: "Verfication Code from ❤️DateNow!",
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
            <h2 style="color: #2c3e50; text-align: center;">Welcome to <span style="color:#ff4d6d;">DateNow</span>!</h2>
            <p>Hello <b>${username}</b>,</p>
            <p>We’re excited to have you on board. Please use the following verification code to complete your signup process:</p>
            
            <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; padding: 12px 24px; font-size: 22px; font-weight: bold; letter-spacing: 3px; background: #ff4d6d; color: #fff; border-radius: 6px;">
                ${otp}
            </span>
            </div>
            
            <p style="color: #555;">This code will expire in <b>10 minutes</b>. Please do not share it with anyone for your account’s security.</p>
            
            <p>Best Regards,<br>
            The <b>DateNow</b> Team<br>
            </p>
            
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #999; text-align: center;">
            If you did not request this code, you can safely ignore this email.
            </p>
        </div>
        `});
        const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: "10m" })
        console.log("Verfication Code sent: %s", info.messageId);
        return res.json({ message: "Verification Code sent successfully!", messageId: info.messageId , token:token });

    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send Verification Code", error: error.message });
    }
});

router.post('/verify-otp', async (req, res) => {
    const { otp,token } = req.body;
    if (!otp) {
        throw new Error('No OTP Received');
    } 

    try {
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    if(decodedToken.otp !== otp)
    {
        throw new Error('OTP does not match')
    }

    return res.status(200).json({ message: "OTP Verfied Successfully!"});
    } catch (error) {
        console.error("Error verifying otp:", error);
        res.status(500).json({ message: "Failed to Verification Code", error: error.message });
    }
});

module.exports = router;
