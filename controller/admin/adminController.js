const mongoose = require('mongoose')
const Model = require('../../model/adminSchema')
const userModel = require('../../model/userSchema')
const bcrypt = require('bcrypt')
const Admin = require('../../model/adminSchema')
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

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const admin = await Admin.findOne({ email: email })
            if (admin) {
                const enteredPassword = await bcrypt.compare(password, admin.password)
                if (enteredPassword) {
                    const adminToken = jwt.sign(
                        {
                            'AdminInfo':
                            {
                                'email': email,
                                'password': password
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: '15m'
                        }
                    )
                    const adminRefreshToken = jwt.sign(
                        { 'id': admin._id },
                        process.env.REFRESH_TOKEN_SECRET,
                        {
                            expiresIn: '15m'
                        }
                    )
                    res.status(200)
                        .cookie('jwt',
                            adminRefreshToken,
                            {
                                httpOnly: true,
                                selfSigned: true,
                                sameSite: 'None',
                                maxAge: 24 * 60 * 60 * 1000
                            })
                        .send({
                            admin, success: true, adminToken, auth: true
                        })

                } else {
                    res.status(403).send({ success: false, message: 'Entered password is incorrect' })
                }

            } else {
                res.status(401).send({ success: false, message: 'Entered email is not a valid email' })
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    refresh: async (req, res) => {
        try {
            res.send({ message: 'this response from refresh' })
        } catch (error) {
            console.log(error);
        }
    }
}