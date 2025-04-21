import Otp from '../models/Otp.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Generate OTP
const generateOTP = (length = 6) => {
    return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
};

// Send OTP to email
export const sendOtpEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}. This code is valid for 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return { success: false, message: 'Failed to send OTP email' };
    }
};

// Handle OTP request
export const requestOtp = async (req, res) => {
    const { email } = req.body;
    console.log("xxxxxxxxxxxxxxx");
    if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const lowerCaseEmail = email.toLowerCase(); // Normalize email case
    const otp = generateOTP();

    try {
        // Store OTP in DB with expiration (5 minutes)
        await Otp.findOneAndUpdate(
            { email: lowerCaseEmail },
            { otp, createdAt: new Date(), expiresAt: new Date(Date.now() + 5 * 60 * 1000) },
            { upsert: true, new: true }
        );

        await sendOtpEmail(lowerCaseEmail, otp);
        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Error sending OTP' });
    }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const otpRecord = await Otp.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({ success: false, error: 'OTP expired or not found' });
        }

        // Check if OTP is expired manually (optional but safer)
        const timeElapsed = (Date.now() - otpRecord.createdAt) / 1000; // in seconds
        if (timeElapsed > 300) { // 5 minutes
            await Otp.deleteOne({ email });
            return res.status(400).json({ success: false, error: 'OTP expired' });
        }

        if (otpRecord.otp !== otp) {
            console.log(otpRecord.otp);
            
            return res.status(400).json({ success: false, error: 'Invalid OTP' });
        }

        // OTP is correct - proceed with signup
        await Otp.deleteOne({ email }); // Remove OTP after successful verification
        res.status(200).json({ success: true, message: 'OTP verified. Proceed with signup.' });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Error verifying OTP' });
    }
};
