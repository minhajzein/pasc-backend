const jwt = require('jsonwebtoken')

module.exports = {
    verifyUser: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization || req.Headers.authorization

            if (!authHeader?.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Unauthorized' })
            }

            const token = authHeader.split(' ')[1]

            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decode) => {
                    if (err) return res.status(403).json({ err_message: 'Forbidden' })
                    req.user = decode.UserInfo.username
                    req.type = decode.UserInfo.type
                    next()
                }
            )

        } catch (error) {
            console.log(error);
        }
    },
    verifyAdmin: async (req, res, next) => {
        try {
            const token = req.headers['x-access-token']
            if (!token) {
                res.send({ error_msg: 'Access denied! please login', auth: false })
            } else {
                jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                    if (err) {
                        res.send({ error_msg: 'Access denied! please login', auth: false })
                    } else {
                        req.userId = decoded.id
                        next()
                    }
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
}