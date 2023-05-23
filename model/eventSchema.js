const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    eventFee: {
        type: Number
    },
    registeredIndividuals: {
        type: Array
    },
    registereddTeams: {
        type: Array
    }
}, { timestamps: true })

module.exports = mongoose.model('event', eventSchema)
