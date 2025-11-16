const mongoose =require('mongoose')

const taskSchema = new mongoose.Schema({
    task:{type:String,required:true,trim:true},
    detail:{type:String,required:true,trim:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}

},{timestamps:true})

      
module.exports =mongoose.model('Task',taskSchema)