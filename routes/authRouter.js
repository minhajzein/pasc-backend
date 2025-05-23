const express = require('express');
const router = express.Router()
const authController = require('../controller/client/authController');
const { sendOTP, verifyOTP } = require('../controller/client/emailController');


//===================


router.post('/sign-up', authController.signUp)

router.post('/login', authController.login)

router.post('/signinWithGoogle', authController.signinWithGoogle)

router.post('/loginWithGoogle', authController.loginWithGoogle)

router.get('/refresh', authController.refresh)

router.post('/send-otp', sendOTP)

router.post('/verify-otp', verifyOTP)

router.post('/reset-password', authController.resetPassword)

router.get('/logout', authController.logout)

//===================

module.exports = router