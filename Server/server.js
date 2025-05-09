import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes  from './routes/postRoutes.js'
import messageRoutes  from './routes/messageRoutes.js'
import { v2 as cloudinary } from 'cloudinary'; 
import {app,server} from './socket/socket.js'
import cors from 'cors'
import path from 'path'


dotenv.config()

connectDB()

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,DELETE,PUT",
    credentials:true
  }));

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//middleware
app.use(express.json({limit: '5mb'})) // to parse incoming requests with JSON payloads
app.use(express.urlencoded({ limit: '5mb',extended: true })) // to parse incoming requests with urlencoded payloads
app.use(cookieParser())

//routes
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/messages",messageRoutes)

app.use(express.static(path.join(__dirname, '/Frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})



server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))

