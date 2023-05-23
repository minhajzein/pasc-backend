const express = require('express');
const router = express.Router()
const controller = require('../controller/admin/adminController')
const newsController = require('../controller/admin/newsController')
const verifyAdmin = require('../middlewares/auth')
const eventsController = require('../controller/admin/eventController')



//========================


router.get('/', verifyAdmin.verifyAdmin, controller.home)

router.post('/login', controller.login)

router.get('/refresh', controller.refresh)

router.post('/addNews', verifyAdmin.verifyAdmin, newsController.createNews)

router.get('/news', verifyAdmin.verifyAdmin, newsController.getAllNews)

router.get('/events', verifyAdmin.verifyAdmin, eventsController.getAllEvents)

router.post('/addEvent', verifyAdmin.verifyAdmin, eventsController.addEvent)

//=========================

module.exports = router
