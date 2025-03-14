const mongoose = require("mongoose");
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
        }
    },
    editProfilePicture: async (req, res) => {
        try {
            const user = await User.findById(req.body.id)
        } catch (error) {
            console.log(error);
        }
    }

}

