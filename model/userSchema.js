const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        minlength: [10],
        maxlength: [10]
    },
    password: {
        type: String,
        required: true,
        minlength: [8],
        trim: true
    },
    title: {
        type: String,
        required: true
    },
    isBanned: {
        type: Boolean,
        required: true
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel