const express =require('express')
const { getUser, loginUser, registerUser } = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const userRouter = express.Router()

userRouter.get('/getUser',auth,getUser)
userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)

module.exports = userRouter