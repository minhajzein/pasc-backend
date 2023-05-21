const express = require('express');
const router = express.Router()
const controller = require('../controller/admin/adminController')
const newsController = require('../controller/admin/newsController')



//========================


router.get('/', controller.home)

router.post('/login', controller.login)

router.get('/refresh', controller.refresh)

router.post('/addNews', newsController.createNews)


//=========================

module.exports = router