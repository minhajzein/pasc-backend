const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        trim: true
    },
    mobile: {
        type: Number,
        trim: true,
        minlength: [10],
        maxlength: [10]
    },
    googleAuth: {
        type: Boolean,
    },
    password: {
        type: String,
        minlength: [8],
        trim: true
    },
    aadhaar: {
        type: Number
    },
    type: {
        type: Array,
        required: true
    },
    avatar: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    isBanned: {
        type: Boolean,
        required: true
    },
    achievements: {
        type: Array
    },
    DOB: {
        type: Date
    },
    gender: {
        type: String
    },
    address: {
        type: String,
    }
}, { timestamps: true })

const userModel = mongoose.model('user', userSchema)
module.exports = userModel