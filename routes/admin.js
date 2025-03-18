const express = require('express');
const router = express.Router()
const controller = require('../controller/admin/adminController')
const newsController = require('../controller/admin/newsController')
const { verifyAdmin } = require('../middlewares/auth')
const eventsController = require('../controller/admin/eventController');
const usersController = require('../controller/admin/usersController');
const requestController = require('../controller/admin/requestController');


//================= imports ==================================================

router.get('/', verifyAdmin, controller.home)

//================ auth =======================================================

router.post('/login', controller.login)
router.get('/refresh', controller.refresh)
router.get('/logout', verifyAdmin, controller.logout)

//================ News =======================================================

router.get('/news', verifyAdmin, newsController.getAllNews)
router.post('/addNews', verifyAdmin, newsController.createNews)
router.patch('/editNews', verifyAdmin, newsController.editNews)
router.delete('/deleteNews', verifyAdmin, newsController.deleteNews)

//================ Events =======================================================

router.get('/events', verifyAdmin, eventsController.getAllEvents)
router.post('/addEvent', verifyAdmin, eventsController.addEvent)
router.patch('/editEvent', verifyAdmin, eventsController.editEvent)
router.delete('/deleteEvent', verifyAdmin, eventsController.deleteEvent)

//================ Users management ==============================================

router.get('/users', verifyAdmin, usersController.getAllUsers)
router.put('/users', verifyAdmin, usersController.deleteUser)
router.patch('/changeStatus', verifyAdmin, usersController.banUnbanUser)
router.patch('/addRoles', verifyAdmin, usersController.addRoles)

//================= Requests managment ============================================

router.get('/requests', verifyAdmin, requestController.getAllRequests)
router.patch('/approve', verifyAdmin, requestController.approve)

//==================================================================================

module.exports = router
