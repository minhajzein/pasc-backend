const mongoose = require("mongoose");
const Model = require('../model/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡


module.exports = {
    home: async (req, res) => {
        try {
            res.send('hello world')
        } catch (error) {
            console.log(error);
        }
    },
    events: async (req, res) => {
        try {

        } catch (error) {

        }
    }
}

