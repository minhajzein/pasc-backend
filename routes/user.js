const express = require('express')
const router = express.Router()
const controller = require('../controller/client/userController')
const tokenVerify = require('../middlewares/auth');
const eventController = require('../controller/client/eventsController')



//================================= home ============================================================================================================================

router.get('/', tokenVerify.verifyUser, controller.home)


//================================= event management =================================================================================================================

router.get('/events', tokenVerify.verifyUser, eventController.getAllEvents)



//================================= profile updation =================================================================================================================


router.patch('/updateProfilePicture', tokenVerify.verifyUser, controller.editProfilePicture)


//====================================================================================================================================================================

module.exports = router