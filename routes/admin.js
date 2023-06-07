const express = require('express');
const router = express.Router()
const controller = require('../controller/admin/adminController')
const newsController = require('../controller/admin/newsController')
const { verifyAdmin } = require('../middlewares/auth')
const eventsController = require('../controller/admin/eventController');
const usersController = require('../controller/admin/usersController');



//========================


router.get('/', verifyAdmin, controller.home)

router.post('/login', controller.login)

router.get('/refresh', controller.refresh)

router.post('/addNews', verifyAdmin, newsController.createNews)

router.get('/news', verifyAdmin, newsController.getAllNews)

router.get('/events', verifyAdmin, eventsController.getAllEvents)

router.post('/addEvent', verifyAdmin, eventsController.addEvent)

router.get('/users', verifyAdmin, usersController.getAllUsers)


//=========================

module.exports = router
