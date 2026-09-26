import express from "express"
import cors from "cors"
import multer from "multer"// use for img uploads
import dotenv from "dotenv"
import morgan from "morgan";
import router from "./routes/api.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("combined"))
app.use("/api/v1",router)
app.use("*any",(req,res)=>{
    return res.status(404).json({success:false,message:"Route Not Found"})
})
const port = process.env.PORT || 8000;

const startServer = async()=>{
    try {
      await connectDB();
      app.listen(port,()=>{
         console.log("Server running on port ", port);
       })
    } catch (error) {
        console.log("DataBase connections failed server not started " ,error)
        process.exit(1);
    }
}

startServer();

export default app;