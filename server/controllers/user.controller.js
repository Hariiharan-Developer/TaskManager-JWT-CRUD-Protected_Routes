const User = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

//TOKEN :
const generateToken = (id)=>{
   return jwt. sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
} 

// REGISTER METHOD :
const registerUser =async(req,res)=>{
    try {
        const {name,email,password,age,phone,role} =req.body
        if (!name || !email || !password || !age || !phone || !role){
           return res.status(400).json({success:false,message:'fields are empty'})
        }
        const alreadyExist = await User.findOne({email})
        if(alreadyExist){
           return res.status(409).json('user already exist')
        }
        const strongPassword = validator.isStrongPassword(password,{
            minLength:8,
            minNumbers:2,
            minUppercase:2,
            minLowercase:2,
            minSymbols:1
        })
        if(!strongPassword){
            res.status(400).json({success:false,message:'password should be strong min length 8 , min uppercase,lowercase,symbols,numbers required 2 character'})
        }
        const genSalt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,genSalt)
        const register = await User.create({
            name,
            email,
            password:hash,
            age,
            phone,
            role,
            
        })
        const token = generateToken(register._id)
       return res.status(200).json({success:true,message:'user registered',data:register,token})
    } catch (error) {
        console.log(`Error:${error.message}`.red.bold)
        res.status(500).json(`Bad connection,message:${error.message}`)
    }
}

//LOGIN METHOD :
const loginUser =async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(409).json({success:false,message:'email & password required'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(409).json({success:false,message:'invalid email id'})
        }
        const compare = await bcrypt.compare(password,user.password)
        if(!compare){
            return res.status(409).json({success:false,message:'invalid password'})
        }
        const token = generateToken(user._id)
        return res.status(200).json({success:true,message:'user logged in',data:user,token})
    } catch (error) {
        console.log(`Error:${error.message}`.red.bold)
        return res.status(400).json(`Bad connection,message:${error.message}`)
    }
}

// GET USER METHOD :
const getUser =async(req,res)=>{
    try {
        const user =await User.findById(req.user._id).select('-password')
        res.status(200).json({success:true,message:'user fetched',data:user})
    } catch (error) {
        console.log(`Error:${error.message}`.red.bold)
        res.status(400).json(`Bad connection,message:${error.message}`)
    }
}


module.exports={
    registerUser,
    loginUser,
    getUser
}