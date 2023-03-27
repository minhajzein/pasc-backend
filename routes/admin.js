const express = require('express');
const router = express.Router()
const controller = require('../controller/adminController')



//========================


router.get('/admin', controller.home)



//=========================

module.exports = router