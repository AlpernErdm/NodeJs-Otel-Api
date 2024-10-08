const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
const db=require('./config/db.js')

const authRoutes=require("./routes/auth.js")
const userRoutes=require("./routes/user.js")
const roomRoutes=require("./routes/room.js")
const hotelRoutes=require("./routes/hotel.js")

dotenv.config();

const app=express();
const PORT=process.env.PORT

app.use(cors())
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cookieParser())

app.use('/',authRoutes)
app.use('/',hotelRoutes)
app.use('/',roomRoutes)
app.use('/',userRoutes)

db();

app.listen(PORT,()=>{
    console.log("Server is running :", PORT)
}) 