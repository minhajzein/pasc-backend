const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const tokenVerify = require('../middlewares/auth');

router.use(tokenVerify.verifyUser)
//==============================================================

router.get('/', controller.home)

router.get('/news', controller.events)

router.patch('/updateProfilePicture', controller.editProfilePicture)


//===============================================================

module.exports = router