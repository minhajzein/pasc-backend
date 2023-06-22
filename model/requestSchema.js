const mongoose = require('mongoose')


const requestShema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    adNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    adImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })

const requestModel = mongoose.model('request', requestShema)
module.exports = requestModel