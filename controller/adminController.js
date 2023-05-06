const mongoose = require('mongoose')
const Model = require('../model/adminSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


//⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡


module.exports = {
    home: async (req, res) => {
        try {

        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        try {
            console.log(req.body);
            await Model.create({
                email: req.body.email,
                password: req.body.password
            })
        } catch (error) {
            console.log(error);
        }
    }
}