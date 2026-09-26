import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    movie:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Movie",
      required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    comment:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const Review = mongoose.model("Review",ReviewSchema)
export default Review;



         