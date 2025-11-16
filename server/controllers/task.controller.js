const taskModel = require("../model/task.model")

// 1. GET TASK :
const getTask = async (req, res) => {
    try {
        const task = await taskModel.find()
        return res.status(200).json({ success: true, data: task })
    } catch (error) {
        console.log(`get task error: ${error.message}`.red.bold)
        return res.status(500).json({ success: false, message: "Server error" })
    }
}

// 2. CREATE TASK :
const createTask = async (req, res) => {
    try {
        const { task, detail } = req.body
        if (!task || !detail) {
            return res.status(400).json({ success: false, message: "task & detail are required" })
        }
        const tasks = await taskModel.create({ task, detail })
        return res.status(201).json({ success: true, data: tasks })
    } catch (error) {
        console.log(`create task error: ${error.message}`.red.bold)
        return res.status(500).json({ success: false, message: "Server error" })
    }
}

// 3. UPDATE TASK :
const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { task, detail } = req.body
        
        if (!id) {
            return res.status(400).json({ success: false, message: "id is required" })
        }

        const updatedTask = await taskModel.findByIdAndUpdate(id, { task, detail }, { new: true })

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" })
        }

        return res.status(200).json({ success: true, data: updatedTask })
    } catch (error) {
        console.log(`update task error: ${error.message}`.red.bold)
        return res.status(500).json({ success: false, message: "Server error" })
    }
}

// 4. DELETE TASK :
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const deletedTask = await taskModel.findByIdAndDelete(id)

        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Task not found" })
        }

        return res.status(200).json({ success: true, message: "Task deleted successfully" })
    } catch (error) {
        console.log(`delete task error: ${error.message}`.red.bold)
        return res.status(500).json({ success: false, message: "Server error" })
    }
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask
}
