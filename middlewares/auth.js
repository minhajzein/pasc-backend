const jwt = require('jsonwebtoken')

module.exports = {
    verifyUser: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorized || req.Headers.authorized

            if (!authHeader?.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Unauthorized', auth: false })
            }

            const token = authHeader.split(' ')[1]

            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decode) => {
                    if (err) {
                        return res.status(403).json({ message: 'Forbidden', auth: false })
                    } else {
                        next()
                    }

                }
            )

        } catch (error) {
            console.log(error);
        }
    },

    verifyAdmin: async (req, res, next) => {
        try {
            const adminToken = req.headers.adminauthorized || req.Headers.adminauthorized
            if (!adminToken?.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Unauthorized' })
            } else {
                const token = adminToken.split(' ')[1]
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        res.send({ error_msg: 'Access denied! please login', auth: false })
                    } else {
                        next()
                    }
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
}

