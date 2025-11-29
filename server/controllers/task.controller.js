const taskModel = require('../model/task.model')
//1.GET METHOD :
const getTask = async(req,res)=>{
    try {
        const task = await taskModel.find({createdBy:req.user._id})
        return res.status(200).json({success:true,message:task})
    } catch (error) {
        console.error(`Error:${error.message}`.red.bold)
        res.status(500).json({success:false,message:'server error'})
    }
}
//2.GET SINGLE METHOD :
const getSignleTask = async(req,res)=>{
    try {
        const{id} =req.params
        if(!id){
            return res.status(400).json({success:false,message:'invalid id'})
        }
        const task = await taskModel.findById(id)
        return res.status(200).json({success:true,message:task})
    } catch (error) {
        console.error(`Error:${error.message}`.red.bold)
        res.status(500).json({success:false,message:'server error'})
    }
}
//3.POST METHOD :
const createTask = async(req,res)=>{
    try {
        const {task,detail,createdBy,status} =req.body
        if(!task || !detail){
            return res.status(400).json({success:false,message:'task & task details are required'})
        }
        const tasks = await taskModel.create({
            task,
            detail,
            status,
            createdBy:req.user._id
        })
        return res.status(200).json({success:true,message:tasks})
    } catch (error) {
        console.error(`Error:${error.message}`.red.bold)
        res.status(400).json({success:false,message:'server error'})
    }
}
//4.UPDATE METHOD :
const updateTask = async(req,res)=>{
    try {
        const {id} =req.params
        const {task,detail,status} = req.body
        if(!task || !detail){
           return res.status(400).json({success:false,message:'task & details are required'})
        }
        const existingTask = await taskModel.findById(id)
        if(!existingTask){
           return res.status(404).json({success:false,message:'task not found'})
        }
        if(req.user._id.toString()!==existingTask.createdBy.toString()){
           return res.status(400).json({success:false,message:'not authorized'})
        }
        const updatedTask = await taskModel.findByIdAndUpdate(id,{task,detail,status},{new:true})
        if(!updatedTask){
           return res.status(404).json({success:false,message:'invalid credantials'})
        }
        return res.status(200).json({success:true,message:updatedTask})
    } catch (error) {
        console.error(`Error:${error.message}`.red.bold)
        return res.status(500).json({success:false,message:'server error'})
    }
}
//5.DELETE METHOD :
const removeTask = async(req,res)=>{
    try {
        const {id} =req.params

        const existingTask = await taskModel.findById(id)
        if(!existingTask){
            res.status(404).json({success:false,message:'task not found'})
        }
        if(existingTask.createdBy.toString() !== req.user._id.toString()){
            res.status(404).json({success:false,message:'not authorized to delete this task'})
        }
        const deletedTask = await taskModel.findByIdAndDelete(id)
        if(!deletedTask){
            res.status(404).json({success:false,message:'invalid credantials'})
        }
        res.status(200).json({success:true,message:`task deleted ${id}`})
    } catch (error) {
        console.error(`Error:${error.message}`.red.bold)
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports={
    getTask,
    getSignleTask,
    createTask,
    updateTask,
    removeTask
}