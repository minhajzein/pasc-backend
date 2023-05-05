const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        trim: true,
        minlength: [10],
        maxlength: [10]
    }, googleAuth: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        minlength: [8],
        trim: true
    },
    type: {
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