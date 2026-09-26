import Review from "../models/Review.js";
import mongoose from "mongoose";

export const isReviewId = async(req,res,next)=>{
    try{
       const {reviewId} = req.params;
       if(!mongoose.isValidObjectId(reviewId)) {
          return res.status(400).json({ success: false, message: "Bad Request" });
       }
       const isExists = await Review.findById({_id:reviewId});
       if (!isExists) {
         return res.status(404).json({ success: false, message: "Review Not Found" });
       }
       next();
    } catch (error) {
        console.log("Error is review Id middleware")
        return res.status(500).json({success:false,message:error.message})
    }
}