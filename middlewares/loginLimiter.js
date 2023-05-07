const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
    window: 60 * 1000,//1 minute
    max: 5,
    message: {
        message: 'Too many login attempts, please try again after a 60 second'
    },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Request: ${options.message.message}\t${req.method}\t${req.url}
        \t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false
})