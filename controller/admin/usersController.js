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
    banUser: async (req, res) => {
        try {
            await Model.findOneAndUpdate({ _id: req.query.id }, { $set: { isBanned: true } })
            res.status(200).send({ success: true })
        } catch (error) {
            console.log(error);
        }
    }
}