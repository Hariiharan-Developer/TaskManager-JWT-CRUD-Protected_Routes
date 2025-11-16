const express = require('express')
const { getTask, createTask, updateTask, deleteTask } = require('../controllers/task.controller')
const taskRouter = express.Router()

taskRouter.get('/getTask',getTask)
taskRouter.post('/createTask',createTask)
taskRouter.put('/updateTask/:id',updateTask)
taskRouter.delete('/removeTask/:id',deleteTask)

module.exports = taskRouter