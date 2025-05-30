import express, { response } from "express"
const app = express()
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
import todoRoute from "../backend/routes/todo.route.js"
import userRoute from "../backend/routes/user.route.js"
dotenv.config();
const port = process.env.PORT
const DB_URI = process.env.MONGO_URI

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:"GET, POST, PUT, DELETE",
  allowedHeaders:["content-type","Authorization"]

}))

try {
 await mongoose.connect(DB_URI)
  console.log('mongoDb connected')
} catch (error) {
  console.log("error connecting mongoDB")
}
app.use("/todo",todoRoute)
app.use("/user", userRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
