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
            await Model.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                category: req.body.category,
                eventType: req.body.eventType,
                limit: req.body.limit,
                playersLimit: req.body.playersLimit,
                teamLimit: req.body.teamLimit,
                startingDate: req.body.startingDate,
                endingDate: req.body.endingDate,
                description: req.body.description,
                image: req.body.image
            })
            res.status(200).send({ success: true })
        } catch (error) {
            console.log(error);
        }
    },

    deleteEvent: async (req, res) => {
        try {
            await Model.findByIdAndDelete(req.body.eventId)
            res.status(200).send({ success: true })
        } catch (error) {
            console.log(error);
        }
    }

}