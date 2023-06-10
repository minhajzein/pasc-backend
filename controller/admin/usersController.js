const Model = require('../../model/userSchema')


module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await Model.find().select('-password').lean()
            if (!users) return res.status(400).json({ message: 'No users found' })
            res.status(200).json(users)
        } catch (error) {
            console.log(error);
        }
    },
    banUnbanUser: async (req, res) => {
        try {
            const user = await Model.findById(req.body.userId)
            if (user) {
                await Model.updateOne({ _id: req.body.userId }, {
                    $set: {
                        isBanned: !user.isBanned
                    }
                })
                res.status(200).send({ success: true })
            } else {
                res.status(200).send({ err_msg: 'User not found' })
            }
        } catch (error) {
            console.log(error);
        }
    },
    addRoles: async (req, res) => {
        try {
            console.log(req.body);
        } catch (error) {
            console.log(error);
        }
    }
}