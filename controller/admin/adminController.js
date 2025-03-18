const User = require('../../model/userSchema')
const bcrypt = require('bcrypt')
const Admin = require('../../model/adminSchema')
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

//⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡


module.exports = {
    home: async (req, res) => {
        try {
            const users = (await User.find()).length
            res.send({ success: true, users: users })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server error', error });
        }
    },

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
                                'email': admin.email
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
                            expiresIn: '1d'
                        }
                    )
                    res.status(200)
                        .cookie('admin', adminRefreshToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'None',
                            maxAge: 24 * 60 * 60 * 1000
                        })
                        .send({ success: true, adminToken })

                } else {
                    res.status(403).send({ success: false, message: 'Entered password is incorrect' })
                }

            } else {
                res.status(401).send({ success: false, message: 'Entered email is not a valid email' })
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        }
    },

    refresh: async (req, res) => {
        const cookies = req.cookies

        if (!cookies?.admin) return res.status(401).json({ message: 'Unauthorized' })

        const refreshToken = cookies.admin

        try {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,

                asyncHandler(async (err, decode) => {
                    if (err) return res.status(401).json({ message: 'Forbidden' })
                    const admin = await Admin.findById(decode.id).select('-password')

                    if (!admin) return res.status(401).json({ message: 'Unauthorized' })

                    const accessToken = jwt.sign(
                        {
                            'AdminInfo':
                            {
                                'email': admin.email
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: '15m'
                        }
                    )
                    res.json({ adminToken: accessToken, admin })

                }))
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        }
    },

    logout: async (req, res) => {
        try {
            const cookies = req.cookies
            if (!cookies?.jwt) return res.sendStatus(204) //No content
            res.clearCookie('admin', {
                httpOnly: true,
                sameSite: 'None',
                secure: true
            }).json({ success: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error', error });
        }
    }
}