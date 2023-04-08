const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/userSchema')

//⚡⚡⚡⚡ imports ⚡⚡⚡⚡

module.exports = {
    signUp: async (req, res) => {
        try {
            const userWithEmail = await User.find({ email: req.body.email })
            const userwithMobile = await User.find({ mobile: req.body.mobile })
            if (userWithEmail[0] !== undefined) {
                res.status(200).send({ error_msg: 'Email is already registered', success: false })
            } else if (userwithMobile[0] !== undefined) {
                res.status(200).send({ error_msg: 'Mobile number is already registered', success: false })
            } else {
                const bcryptedPassword = await bcrypt.hash(req.body.password, 10)
                await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: bcryptedPassword,
                    type: 'user',
                    isBanned: false
                })
                const user = await User.findOne({ email: req.body.email })
                const id = user._id
                const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: 300 })
                res.status(200).send({ success: true, user, token })
            }
        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        try {
            console.log(req.body);
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                if (user.password === 'emailLogin') {
                    res.status(200).send({ error_msg: "Please login with google" })
                } else {
                    const password = await bcrypt.compare(req.body.password, user.password)
                    if (password) {
                        if (!user.isBanned) {
                            const id = user._id
                            const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: 300 })
                            res.status(200).send({ success: true, user, token })
                        } else {
                            res.status(200).send({ error_msg: "You are temporarily banned from PASC", success: false })
                        }
                    } else {
                        res.status(200).send({ error_msg: "Entered password is incorrect", success: false })
                    }
                }
            } else {
                res.status(200).send({ error_msg: "Email is not registered", success: false })
            }
        } catch (error) {
            console.log(error);
        }
    },
    signinWithGoogle: async (req, res) => {
        try {
            const userWithEmail = await User.find({ email: req.body.email })
            if (userWithEmail[0] !== undefined) {
                res.status(200).send({ error_msg: 'Email is already registered', success: false })
            } else {
                await User.create({
                    username: req.body.displayName,
                    email: req.body.email,
                    password: 'emailLogin',
                    type: 'user',
                    isBanned: false
                })
                const user = await User.findOne({ email: req.body.email })
                const id = user._id
                const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: 300 })
                res.status(200).send({ success: true, user, token })
            }
        } catch (error) {
            console.log(error);
        }
    },
    loginWithGoogle: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const id = user._id
                const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: 300 })
                res.status(200).send({ success: true, user, token })
            } else {
                res.status(200).send({ error_msg: "Email is not registered" })
            }
        } catch (error) {
            console.log(error);
        }
    }
}