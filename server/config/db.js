const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected ${mongoose.connection.name}`.blue.bold)
    } catch (error) {
        console.error(`Database Error:${error.message}`.red.bold)
    }
}

module.exports = connectDB