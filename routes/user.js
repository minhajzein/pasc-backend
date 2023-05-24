const express = require('express')
const router = express.Router()
const controller = require('../controller/client/userController')
const tokenVerify = require('../middlewares/auth');
const eventController = require('../controller/client/eventsController')

router.use(tokenVerify.verifyUser)

//================================= home =============================

router.get('/', controller.home)


//================================= event management =================================

router.get('/events', eventController.getAllEvents)



//================================= profile updation =================================================


router.patch('/updateProfilePicture', controller.editProfilePicture)


//===============================================================

module.exports = router