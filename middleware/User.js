import User from "../models/User.js"
import mongoose from "mongoose";

export const isUserId =  async(req,res,next)=>{
  try {
      const {userId} = req.params;

      if(!mongoose.isValidObjectId(userId)) {
         return res.status(400).json({ success: false, message: "Bad Request" });
       }
      const isExists = await User.findById({ _id: userId });
      if (!isExists) {
         return res.status(404).json({ success: false, message: "User Not Found" });
       }
      next();
  } catch (error) {
    console.log("Error in isUser Id middleware ",error)
    return res.status(500).json({success:false,message:error.message})
  }
}