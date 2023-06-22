const Request = require('../../model/requestSchema')
const User = require('../../model/userSchema')
const { login } = require('./adminController')




module.exports = {

    getAllRequests: async (req, res) => {
        try {
            const requests = await Request.find().sort({ createdAt: -1 })
            if (!requests[0]) return res.status(200).send({ err_msg: 'No more requests' })
            res.status(200).json(requests)
        } catch (error) {
            console.log(error);
        }
    },

    approve: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.body.user, {
                $push: { type: 'paymentPending' }
            })
            await User.findByIdAndUpdate(req.body.user, {
                $pull: { type: 'review' }
            })
            await Request.findByIdAndUpdate(req.body._id, {
                $set: { status: 'paymentPending' }
            })
            res.status(200).send({ success: true })
        } catch (error) {
            console.log(error);
        }
    }

}