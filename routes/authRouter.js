const express = require('express');
const router = express.Router()
const authController = require('../controller/authController')


//===================


router.post('/signup', authController.signUp)

router.post('/login', authController.login)

router.post('/signinWithGoogle', authController.signinWithGoogle)

router.post('/loginWithGoogle', authController.loginWithGoogle)


//===================

module.exports = router