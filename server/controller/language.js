import User from '../models/auth.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Twilio configuration
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Store verification codes temporarily (in production, use Redis or similar)
const verificationCodes = new Map();

export const sendEmailVerification = async (req, res) => {
    try {
        const { email, language } = req.body;
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationId = Date.now().toString();

        // Store the verification code
        verificationCodes.set(verificationId, {
            code: verificationCode,
            email,
            language,
            timestamp: Date.now()
        });

        // Send verification email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Language Change',
            html: `
                <h2>Language Change Verification</h2>
                <p>Your verification code is: <strong>${verificationCode}</strong></p>
                <p>This code will expire in 10 minutes.</p>
            `
        });

        // Clean up verification code after 10 minutes
        setTimeout(() => {
            verificationCodes.delete(verificationId);
        }, 600000);

        res.status(200).json({
            success: true,
            message: 'Verification code sent to email',
            verificationId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending verification code',
            error: error.message
        });
    }
};

export const sendSMSVerification = async (req, res) => {
    try {
        const { phone, language } = req.body;
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationId = Date.now().toString();

        // Store the verification code
        verificationCodes.set(verificationId, {
            code: verificationCode,
            phone,
            language,
            timestamp: Date.now()
        });

        // Send verification SMS
        await twilioClient.messages.create({
            body: `Your verification code for language change is: ${verificationCode}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        // Clean up verification code after 10 minutes
        setTimeout(() => {
            verificationCodes.delete(verificationId);
        }, 600000);

        res.status(200).json({
            success: true,
            message: 'Verification code sent to phone',
            verificationId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending verification code',
            error: error.message
        });
    }
};

export const verifyCode = async (req, res) => {
    try {
        const { code, verificationId, language } = req.body;
        const verificationData = verificationCodes.get(verificationId);

        if (!verificationData) {
            return res.status(400).json({
                success: false,
                message: 'Verification code expired or invalid'
            });
        }

        if (verificationData.code !== code) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code'
            });
        }

        // Update user's language preference
        const user = await User.findByIdAndUpdate(
            req.userId,
            { language },
            { new: true }
        );

        // Clean up verification code
        verificationCodes.delete(verificationId);

        res.status(200).json({
            success: true,
            message: 'Language updated successfully',
            language: user.language
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying code',
            error: error.message
        });
    }
};
