const mongoose = require("mongoose");
const Model = require('../../model/userSchema')



//⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡


module.exports = {
    home: async (req, res) => {
        try {
            res.send({ success: true })
        } catch (error) {
            console.log(error);
        }
    },
    editProfilePicture: async (req, res) => {
        try {
            const user = await Model.findById(req.body.id)
        } catch (error) {
            console.log(error);
        }
    },
    events: async (req, res) => {
        try {

        } catch (error) {

        }
    }
}

