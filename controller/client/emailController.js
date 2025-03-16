const nodemailer = require('nodemailer');
require("dotenv").config();


// Function to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email app password
    },
});


module.exports = {
    sendOTP: async (req, res) => {
        const { email } = req.body;

        if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

        const otp = generateOTP();
        req.session.otp = otp
        // Store OTP temporarily

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code For GodLand Infotech',
            text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
        };

        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    res.status(500).json({ success: false, message: 'Error sending OTP', error });
                } else {
                    res.json({ success: true, message: 'OTP Sent To Your Registered Email Address' });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending OTP', error });
        }
    },

    verifyOTP: async (req, res) => {
        const { otp } = req.body;

        if (!otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });
        if (req.session.otp === otp) {
            res.json({ success: true, message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    }

}