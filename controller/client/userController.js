const User = require('../../model/userSchema')
const Event = require('../../model/eventSchema');



//⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡


module.exports = {
    home: async (req, res) => {
        try {
            const latestEvents = await Event.find().limit(4)
            const latestNews = await News.find().limit(5)
            res.json(latestEvents, latestNews)
        } catch (error) {
            console.log(error);
            res.send({ success: false, err_msg: 'Internal server error' })
        }
    },

    uploadProfilePicture: async (req, res) => {
        try {
            const user = await User.create({ avatar: req.body.avatar })
            res.send({ success: true, user })
        } catch (error) {
            console.log(error);
            res.send({ success: false, err_msg: 'Internal server error' })
        }
    },

    editProfilePicture: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { avatar: req.body.avatar })
        } catch (error) {
            console.log(error);
            res.send({ success: false, err_msg: 'Internal server error' })
        }
    }

}

