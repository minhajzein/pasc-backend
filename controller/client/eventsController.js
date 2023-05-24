const Model = require('../../model/eventSchema')


module.exports = {
    getAllEvents: async (req, res) => {
        try {
            const events = await Model.find().sort({ createdAt: -1 }).limit(20)
            res.status(200).send({ success: true, events })
        } catch (error) {
            console.log(error);
        }
    }
}