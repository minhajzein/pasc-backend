const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const newsModel = mongoose.model('news', newsSchema)

module.exports = newsModel