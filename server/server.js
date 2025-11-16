const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const taskRouter = require('./routes/task.route')
const connectDb = require('./config/db')
const app = express()

// MIDDLEWARE :
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//API END_POINT :
app.use('/api/task',taskRouter)
const port = process.env.PORT || 4884

//DATABASE CONNECTION:
connectDb()
app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.green.bold)
})