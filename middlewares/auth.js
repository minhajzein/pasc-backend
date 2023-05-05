const jwt = require('jsonwebtoken')

module.exports = {
    verifyUser: async (req, res, next) => {
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