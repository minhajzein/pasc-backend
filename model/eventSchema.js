const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    limit: {
        type: String,
        required: true
    },
    playersLimit: {
        type: Number
    },
    teamLimit: {
        type: Number
    },
    endingDate: {
        type: Date,
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
})

module.exports = mongoose.model('event', eventSchema)
