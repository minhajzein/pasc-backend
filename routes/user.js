const express = require('express')
const router = express.Router()
const controller = require('../controller/client/userController')
const tokenVerify = require('../middlewares/auth');

router.use(tokenVerify.verifyUser)
//==============================================================

router.get('/', controller.home)

router.get('/news', controller.events)

router.patch('/updateProfilePicture', controller.editProfilePicture)


//===============================================================

module.exports = router