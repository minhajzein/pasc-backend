
//⚡⚡⚡⚡⚡ requirements ⚡⚡⚡⚡⚡  


const express = require('express');
const app = express()
const devLogger = require('morgan')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const connectDb = require('./connections/database/mongodb')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL
const cors = require('cors')
const { logger, logEvents } = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOption')
const PORT = process.env.PORT


// 🔥🔥 use and set 🔥🔥

connectDb(DATABASE_URL)

app.use(logger)
app.use(errorHandler)
app.use(cookieParser())

app.use(cors(corsOptions))


app.use(devLogger("dev"))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server Listening at http://localhost:${PORT} 🙂🙂🙂🙂🙂`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

//⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙  

module.exports = app