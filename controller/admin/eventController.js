const Model = require('../../model/eventSchema')


module.exports = {
    getAllEvents: async (req, res) => {
        try {
            const events = await Model.find().sort({ startingDate: - 1 })
            res.status(200).json(events)
        } catch (error) {
            console.log(error);
        }
    },
    addEvent: async (req, res) => {
        try {
            await Model.create(req.body)
            const events = await Model.find().sort({ startingDate: - 1 })
            res.status(200).send({ events, success: true })
        } catch (error) {
            console.log(error);
        }
    },
    editEvent: async (req, res) => {
        try {
            console.log(req.body);
        } catch (error) {
            console.log(error);
        }
    }
}