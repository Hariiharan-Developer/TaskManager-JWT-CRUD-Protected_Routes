const express = require('express')
const { getTask, getSignleTask, createTask, updateTask, removeTask } = require('../controllers/task.controller')
const auth = require('../middleware/auth')
const taskRouter = express.Router()

taskRouter.get('/',auth,getTask)
taskRouter.get('/getSingle/:id',auth,getSignleTask)
taskRouter.post('/',auth,createTask)
taskRouter.put('/:id',auth,updateTask)
taskRouter.delete('/:id',auth,removeTask)

module.exports = taskRouter