const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const taskRouter = require('./routes/task.route')
const connectDB = require('./config/db')
const userRouter = require('./routes/user.route')
const cors = require('cors')

const app = express()
//CORS :
app.use(cors())
//DATABASE CALLBACK:
connectDB()

//MIDDLEWARE :
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//API END POINT :
app.use('/api/task',taskRouter)
app.use('/api/user',userRouter)
;
//SERVER :
const port = process.env.PORT || 4444
app.listen(port,()=>{
    console.log(`server listening on the port http://localhost${port}`.yellow)
})