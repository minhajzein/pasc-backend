const mongoose = require('mongoose')
const Model = require('../model/adminSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


//⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡


module.exports = {
    home: async (req, res) => {
        try {
            res.json({ auth: true })
        } catch (error) {
            console.log(error)
        }
    },
    signUp: async (req, res) => {
        try {

        } catch (error) {
            console.log(error);
        }
    }
}