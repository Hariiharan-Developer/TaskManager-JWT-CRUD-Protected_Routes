const mongoose = require('mongoose')
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Databa base connected :${mongoose.connection.name}`.blue.bold)
    }catch(error){
        console.error(`Database Error:${error.message}`.red.bold)
    }

}
module.exports = connectDb