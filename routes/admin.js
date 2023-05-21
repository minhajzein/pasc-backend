const express = require('express');
const router = express.Router()
const controller = require('../controller/adminController')



//========================


router.get('/', controller.home)

router.post('/login', controller.login)

router.get('/refresh', controller.refresh)


//=========================

module.exports = router