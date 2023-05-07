const mongoose = require('mongoose')
const Model = require('../model/adminSchema')
const userModel = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

//⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡


module.exports = {
    home: asyncHandler(async (req, res) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }),

    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body

        //Hash password
        const hashedPwd = await bcrypt.hash(password, 10) //salt rounds

        const admin = await Model.create({
            email: email,
            password: hashedPwd
        })
        if (admin) {
            res.status(201).json({ message: 'Admin created' })
        }
    }),

    getAllUsers: asyncHandler(async (req, res) => {
        const users = await userModel.find().select('-password').lean()
        if (!users) {
            return res.status(400).json({ message: 'No users found' })
        }
        res.json(users)
    })
}