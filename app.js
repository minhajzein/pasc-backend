
//⚡⚡⚡⚡⚡ requirements ⚡⚡⚡⚡⚡  


const express = require('express');
const app = express()
const devLogger = require('morgan')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const connectDb = require('./connections/database/mongodb')
const dotenv = require('dotenv')
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL
const cors = require('cors')
const { logger } = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOption')
const PORT = process.env.PORT


// 🔥🔥 use and set 🔥🔥


app.use(logger)
app.use(errorHandler)
app.use(cookieParser())

connectDb(DATABASE_URL)

app.use(cors(corsOptions))


app.use(devLogger("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/', userRouter)
app.use('/admin', adminRouter)


app.listen(PORT, () => console.log(`Server Listening at http://localhost:${PORT} 🙂🙂🙂🙂🙂`))


//⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙  

module.exports = app