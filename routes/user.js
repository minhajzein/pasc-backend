const express = require('express')
const router = express.Router()
const controller = require('../controller/client/userController')
const { verifyUser } = require('../middlewares/auth');
const eventController = require('../controller/client/eventsController');
const newsController = require('../controller/client/newsController');
const applicationController = require('../controller/client/membershipController')


//================================= home =======================================================

router.get('/', verifyUser, controller.home)

//================================= news ==============================================================

router.get('/news', verifyUser, newsController.getAllNews)

//================================= events ======================================================

router.get('/events', verifyUser, eventController.getAllEvents)

//================================= profile updation ============================================

router.put('/update-profile/:id', verifyUser, controller.updateProfile)
router.patch('/updateProfilePicture', verifyUser, controller.editProfilePicture)

//================================= application =================================================

router.post('/checkMobile', verifyUser, applicationController.checkMobile)
router.patch('/addMobile', verifyUser, applicationController.addMobile)
router.post('/createRequest', verifyUser, applicationController.createRequest)

//===============================================================================================


module.exports = router