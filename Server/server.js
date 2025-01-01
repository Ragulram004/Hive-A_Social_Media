import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes  from './routes/postRoutes.js'


dotenv.config()

connectDB()
const app = express()

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json()) // to parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })) // to parse incoming requests with urlencoded payloads
app.use(cookieParser())

//routes
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))

