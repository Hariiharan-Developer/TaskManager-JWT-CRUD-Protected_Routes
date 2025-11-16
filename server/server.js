const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const app = express()

// MIDDLEWARE :
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.PORT || 4884

app.listen(port,()=>{
    console.log(`server listening on the port http://localhost:${port}`.green.bold)
})