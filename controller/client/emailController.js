const nodemailer = require('nodemailer');
require("dotenv").config();
const OTP = require('../../model/otpSchema')


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
        await OTP.deleteMany({ email: email })
        const otp = generateOTP();
        await OTP.create({ email: email, otp: otp })
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
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

        try {
            // Retrieve OTP from Redis and log it
            const storedOTP = await OTP.findOne({ email: email });

            if (storedOTP && storedOTP.otp == otp) {
                await OTP.deleteMany({ email: email }) // Delete OTP after verification
                res.json({ success: true, message: 'OTP verified successfully' });
            } else {
                res.status(400).json({ message: 'Invalid or expired OTP' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }

}