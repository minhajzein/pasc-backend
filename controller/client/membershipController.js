const User = require('../../model/userSchema')
const Request = require('../../model/requestSchema')



module.exports = {

    addMobile: async (req, res) => {
        try {
            const userWithNumber = await User.find({ mobile: req.body.mobile });
            if (userWithNumber[0]) {
                return res.status(200).send({ success: false, err_msg: 'Mobile number is already taken' })
            } else {
                await User.findByIdAndUpdate(req.body.userId, { $set: { mobile: req.body.mobile } })
                res.status(2000).send({ success: true })
            }
        } catch (error) {
            console.log(error);
        }
    },

    createRequest: async (req, res) => {
        try {
            const userWithAadhaar = await User.findOne({ aadhaar: req.body.adNumber })
            if (userWithAadhaar) {
                return res.status(200).send({ success: false, err_msg: 'Aadhaar number is already taken' })
            } else {
                await User.findByIdAndUpdate(req.body.userId, {
                    $set: { aadhaar: req.body.adNumber },
                    $push: { type: 'review' }
                })
                await User.findByIdAndUpdate(req.body.userId, {
                    $pull: { type: 'guest' }
                })
                await Request.create({
                    user: req.body.userId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    adNumber: req.body.adNumber,
                    address: req.body.address,
                    image: req.body.image,
                    adImage: req.body.adImage,
                    status: 'underReview'
                })
                const user = await User.findOne({ _id: req.body.userId })
                res.status(200).send({ success: true, user })
            }
        } catch (error) {
            console.log(error);
        }
    }

}