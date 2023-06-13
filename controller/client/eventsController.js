const Model = require('../../model/eventSchema')


module.exports = {

    getAllEvents: async (req, res) => {
        try {
            const events = await Model.find().sort({ startingDate: - 1 })
            res.status(200).json(events)
        } catch (error) {
            console.log(error);
        }
    }

}