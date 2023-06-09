const express = require('express');
const router = express.Router()
const authController = require('../controller/client/authController')


//===================


router.post('/signup', authController.signUp)

router.post('/login', authController.login)

router.post('/signinWithGoogle', authController.signinWithGoogle)

router.post('/loginWithGoogle', authController.loginWithGoogle)

router.get('/refresh', authController.refresh)

//===================

module.exports = router