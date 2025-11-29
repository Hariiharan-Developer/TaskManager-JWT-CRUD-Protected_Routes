const mongoose = require('mongoose')
const validator =require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required'],
        minlength:[3,'name should be 3 characters '],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        validate:{
          validator:  function (value){
                return validator.isEmail(value)
            },
        message:'invalid email format'
        },
        required:[true, 'email is required'],
        lowercase:true,
        trim:true
    },
    age:{
        type:Number,
        min:[1, 'age should be atleast 1'],
        max:[120, 'age must not exceed 120'],
        trim:true,
        required:[true, 'age is required']
    },
    phone:{
        type:String,
        required:[true,'phone is required'],
        validate:{
           validator: function(value){
                return validator.isMobilePhone(value,'en-IN')
            },
        message:'invalid number'
        },
        trim:true

    },
    password:{
        type:String,
        trim:true,
        required:[true, 'password is required'],
        validate:{
           validator: function(value){
               return validator.isStrongPassword(value,{
                minLength:8,
                minLowercase:2,
                minUppercase:2,
                minSymbols:1,
                minNumbers:1
               })
            },
            message:'password must be strong minimum length:8 minimum lowercase:2 minimum uppercase:2 minimum number:1 minimum symbol:1'
        }
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }

},{timestamps:true})

module.exports = mongoose.model('User', userSchema)