
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
    origin: ['http://127.0.0.1:5173'],
    methods: ["GET", "POST", "PUT", "DELETE"],
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