const express = require('express');
const router = express.Router()
const controller = require('../controller/admin/adminController')
const newsController = require('../controller/admin/newsController')
const { verifyAdmin } = require('../middlewares/auth')
const eventsController = require('../controller/admin/eventController');
const usersController = require('../controller/admin/usersController');



//================================ imports ========================================================================================

router.get('/', verifyAdmin, controller.home)


//================ auth ===========================================================================================================

router.post('/login', controller.login)
router.get('/refresh', controller.refresh)

//================ News ===========================================================================================================

router.get('/news', verifyAdmin, newsController.getAllNews)
router.post('/addNews', verifyAdmin, newsController.createNews)

//================ Events =========================================================================================================

router.get('/events', verifyAdmin, eventsController.getAllEvents)
router.post('/addEvent', verifyAdmin, eventsController.addEvent)
router.patch('/editEvent', verifyAdmin, eventsController.editEvent)

//================ Users management ================================================================================================

router.get('/users', verifyAdmin, usersController.getAllUsers)
router.patch('/changeStatus', verifyAdmin, usersController.banUnbanUser)
router.patch('/addRoles', verifyAdmin, usersController.addRoles)

//==================================================================================================================================

module.exports = router
