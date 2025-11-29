const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

const auth = async(req,res,next)=>{
    try{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
       return res.status(404).json({success:false,message:'no token provided'})
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    console.log('Decoded token:',decoded)
    req.users = await User.findById(decoded.id)
    console.log(req.users)
    req.user = await User.findById(decoded.id).select('-password')
    next()
}catch(error){
    console.log(`Auth Error: ${error.message}`)
    res.status(404).json({success:false,message:'inavlid token or expired token'})
}

}

module.exports = auth