
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../model/userSchema')
const asyncHandler = require('express-async-handler')

//⚡⚡⚡⚡ imports ⚡⚡⚡⚡

module.exports = {
    signUp: async (req, res) => {
        try {
            const userWithEmail = await User.find({ email: req.body.email })
            const userwithMobile = await User.find({ mobile: req.body.mobile })
            if (userWithEmail[0] !== undefined) {
                return res.status(200).send({ error_msg: 'Email is already registered', success: false })
            } else if (userwithMobile[0] !== undefined) {
                return res.status(200).send({ error_msg: 'Mobile number is already registered', success: false })
            } else {
                const bcryptedPassword = await bcrypt.hash(req.body.password, 10)
                await User.create({
                    ...req.body,
                    password: bcryptedPassword,
                    googleAuth: false,
                    type: ['guest'],
                    coverPhoto: null,
                    achievements: null,
                    isBanned: false
                })
                const user = await User.findOne({ email: req.body.email }).select('-password')
                const accessToken = jwt.sign(
                    {
                        'UserInfo': {
                            'id': user._id,
                            'username': user.username,
                            'type': user.type
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '15m'
                    }
                )

                const refreshToken = jwt.sign(
                    { "id": user._id },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                )
                res.status(200)
                    .cookie('jwt', refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    .send({ success: true, user, accessToken })
            }
        } catch (error) {
            console.log(error)
            res.send({ success: false, message: 'Internal server error' })
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                if (user.googleAuth && user.password === null) {
                    res.send({ error_msg: "Please try to login with google" })
                } else {
                    const password = await bcrypt.compare(req.body.password, user.password)
                    if (password) {
                        if (!user.isBanned) {

                            const accessToken = jwt.sign(
                                {
                                    'UserInfo': {
                                        'id': user._id,
                                        'username': user.username,
                                        'type': user.type
                                    }
                                },
                                process.env.ACCESS_TOKEN_SECRET,
                                {
                                    expiresIn: '15m'
                                }
                            )

                            const refreshToken = jwt.sign(
                                { "id": user._id },
                                process.env.REFRESH_TOKEN_SECRET,
                                { expiresIn: '1d' }
                            )
                            res.status(200)
                                .cookie('jwt', refreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: 'None',
                                    maxAge: 24 * 60 * 60 * 1000
                                })
                                .send({ success: true, user, accessToken, auth: true })
                        } else {
                            res.status(200)
                                .send({ error_msg: "You are temporarily banned from PASC", success: false })
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
            res.send({ success: false, message: 'Internal server error' })
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { email, password } = req.body
            const bcryptedPassword = await bcrypt.hash(password, 10)
            const user = await User.findOne({ email: email })
            await User.findByIdAndUpdate(user._id, { password: bcryptedPassword })
            res.send({ success: true, message: 'Password changed successfully' })
        } catch (error) {
            console.log(error);
            res.send({ success: false, message: 'Internal server error' })
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
                    password: null,
                    googleAuth: true,
                    mobile: null,
                    type: ['guest'],
                    avatar: null,
                    coverPhoto: null,
                    achievements: null,
                    isBanned: false
                })
                const user = await User.findOne({ email: req.body.email })

                const accessToken = jwt.sign(
                    {
                        'UserInfo': {
                            'id': user._id,
                            'username': user.username,
                            'type': user.type
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '15m'
                    }
                )

                const refreshToken = jwt.sign(
                    { "id": user._id },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                )
                res.status(200)
                    .cookie('jwt', refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    .send({ success: true, user, accessToken })
            }
        } catch (error) {
            console.log(error);
            res.send({ success: false, err_msg: 'Internal server error' })
        }
    },

    loginWithGoogle: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const accessToken = jwt.sign(
                    {
                        'UserInfo': {
                            'id': user._id,
                            'username': user.username,
                            'type': user.type
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '15m'
                    }
                )
                const refreshToken = jwt.sign(
                    { "id": user._id },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                )
                res.status(200)
                    .cookie('jwt', refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    .send({ success: true, user, accessToken })
            } else {
                res.status(200).send({ error_msg: "Email is not registered", success: false })
            }
        } catch (error) {
            console.log(error);
            res.send({ success: false, err_msg: 'Internal server error' })
        }
    },

    refresh: (req, res) => {
        const cookies = req.cookies

        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized', success: false })

        const refreshToken = cookies.jwt

        try {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                asyncHandler(async (err, decoded) => {
                    if (err) return res.status(403).json({ message: 'Forbidden' })

                    const user = await User.findOne({ _id: decoded.id }).select('-password')

                    if (!user || user.isBanned) return res.status(401).json({ message: 'Unauthorized' })

                    const accessToken = jwt.sign(
                        {
                            'UserInfo': {
                                'id': user._id,
                                'username': user.username,
                                'type': user.type
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: '15m'
                        }
                    )

                    res.json({ accessToken, user })
                })
            )
        } catch (error) {
            console.log(error);
            res.send({ success: false, err_msg: 'Internal server error' })
        }
    },

    logout: async (req, res) => {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(204) //No content
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        })
        res.status(200).json({ message: 'Cookie cleared', success: true })
    }
}