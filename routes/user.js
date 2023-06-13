const express = require('express')
const router = express.Router()
const controller = require('../controller/client/userController')
const { verifyUser } = require('../middlewares/auth');
const eventController = require('../controller/client/eventsController');
const newsController = require('../controller/client/newsController');



//================================= home =======================================================
router.get('/', verifyUser, controller.home)

//===============================================================================================

router.get('/news', verifyUser, newsController.getAllNews)

//================================= events ======================================================

router.get('/events', verifyUser, eventController.getAllEvents)

//================================= profile updation ============================================

router.patch('/updateProfilePicture', verifyUser, controller.editProfilePicture)

//===============================================================================================
module.exports = router