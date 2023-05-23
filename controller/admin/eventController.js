const Model = require('../../model/eventSchema')


module.exports = {
    getAllEvents: async (req, res) => {
        try {
            const events = await Model.find().sort({ createdAt: -1 }).limit(20)
            res.status(200).send({ events, success: true, auth: true })
        } catch (error) {
            console.log(error);
        }
    },
    addEvent: async (req, res) => {
        try {
            await Model.create(req.body)
            const events = await Model.find().sort({ createdAt: -1 }).limit(20)
            res.status(200).send({ events, success: true })
        } catch (error) {
            console.log(error);
        }
    }
}