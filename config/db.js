import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DataBase Connected Successfully " , conn.connection.host)
    } catch (error) {
        console.log("Error in database connections")
    }
}

export default connectDB;