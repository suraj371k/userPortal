import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import userRoute from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import fileRoute from './routes/file.routes.js'

const app = express()
dotenv.config()

const port = process.env.PORT || 4500

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static("uploads"));


//routes
app.use('/api/user' , userRoute)
app.use('/api/files' , fileRoute)


//mongodb connection
connectDb()

app.listen(port , () => {
    console.log(`App is running of ${port}`)
})

