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

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            res.send({ success: false, message: 'Internal server error' })
        }
    },

    editProfilePicture: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { avatar: req.body.avatar })
        } catch (error) {
            console.log(error);
            res.send({ success: false, err_msg: 'Internal server error' })
        }
    },

    updateProfile: async (req, res) => {
        try {
            const userWithEmail = await User.find({ email: req.body.email })
            const userwithMobile = await User.find({ mobile: req.body.mobile })
            if (userWithEmail[0] !== undefined)
                return res.status(200).send({ message: 'Email is already registered', success: false })
            if (userwithMobile[0] !== undefined)
                return res.status(200).send({ message: 'Mobile Number is already registered', success: false })

            const user = await User.findByIdAndUpdate(req.params.id, {
                email: req.body.email,
                mobile: req.body.mobile,
                avatar: req.body.avatar,
                address: req.body.address,
                username: req.body.username,
                gender: req.body.gender,
                DOB: req.body.DOB
            })
            res.send({ success: true, message: 'Profile Updated', user: user })
        } catch (error) {
            console.log(error);
            res.send({ success: false, message: 'Internal server error' })
        }
    }

}

