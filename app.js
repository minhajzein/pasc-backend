
//⚡⚡⚡⚡⚡ requirements ⚡⚡⚡⚡⚡  


const express = require('express');
const app = express()
const logger = require('morgan')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const connectDb = require('./connections/database/mongodb')
const dotenv = require('dotenv')
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT
const cors = require('cors')


// 🔥🔥 use and set 🔥🔥


connectDb(DATABASE_URL)
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST"],
    credentials: true
}))


app.use(logger("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/', userRouter)
app.use('/admin', adminRouter)


app.listen(PORT, () => console.log(`Server Listening at http://localhost:${PORT} 🙂🙂🙂🙂🙂`))


//⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙  

module.exports = app