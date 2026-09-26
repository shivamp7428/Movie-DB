import Review from "../models/Review.js";


export const addReview = async(req,res)=>{
    try {
        const {userId,movieId} = req.params;
        const {rating,comment} = req.body;
        if(rating === undefined || rating<=0 || rating>10){
            return res.status(400).json({success:false,message:"Bad Request"})
        }
        const newReview = new Review({
            user:userId,
            movie:movieId,
            rating:rating,
            comment:comment
        })
        await newReview.save();
        return res.status(201).json({success:true, message:"Review Added Successfully", Review:newReview})
    } catch (error) {
        console.log("Error in addReview controller")
        return res.status(500).json({success:false ,message:error.message})
    }
}

export const getReviewById = async(req,res)=>{
  try {
       const {reviewId} = req.params;
       const review = await Review.findById({_id:reviewId})
       return res.status(200).json({success:true,message:"Review Fetched Successfully" ,review:review})    
  } catch (error) {
       console.log("Error in get Review controller")
       return res.status(500).json({success:false ,message:error.message})
  }
}

export const getReviewByUser = async(req,res)=>{
    try {
        const {userId} = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const reviewData = await Review.find({user:userId}).sort({createdAt:-1}).limit(limit).skip(skip);
        if(reviewData.length===0){
            return res.status(404).json({success:false,message:"Review Not Found"})
        }
        return res.status(200).json({success:true,message:"Review Fetched Successfully" , reviews:reviewData})
    } catch (error) {
         console.log("Error in get Review by user controller")
       return res.status(500).json({success:false ,message:error.message})
    }
}

export const getReviewByMovie = async(req,res)=>{
    try {
        const {movieId} = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const reviewData = await Review.find({movie:movieId}).sort({createdAt:-1}).limit(limit).skip(skip);
        if(reviewData.length===0){
            return res.status(404).json({success:false,message:"Review Not Found"})
        }
        return res.status(200).json({success:true,message:"Review Fetched Successfully" , reviews:reviewData})
    } catch (error) {
         console.log("Error in get Review by movie controller")
       return res.status(500).json({success:false ,message:error.message})
    }
}

export const removeReview = async(req,res)=>{
    try {
        const {reviewId} = req.params
        const review = await Review.findById({_id:reviewId})
        await review.deleteOne();
        return res.status(200).json({success:true,message:"Review Deleted Successfully" ,deleted_Review:review})
    } catch (error) {
         console.log("Error in remove Review controller")
        return res.status(500).json({success:false ,message:error.message})
    }
}

export const updateReview = async(req,res)=>{
    try {
        const {reviewId} = req.params
        const {rating,comment} = req.body;
        if((rating === undefined && comment === undefined) && !comment){
            return res.status(400).json({success:false,message:"Bad Request"})
        }
        if(rating !== undefined && (rating<0 || rating>10)){
            return res.status(400).json({success:false,message:"Bad Request"})
        }
        const review = await Review.findById({_id:reviewId});
        if(rating !== undefined){
          review.rating = rating
        }
        if(comment !== undefined){
            review.comment = comment
        }
        await review.save();
        return res.status(200).json({success:true, message:"Review Updated Successfully",updated_Review:review})
    } catch (error) {
        console.log("Error in Update Review controller")
        return res.status(500).json({success:false ,message:error.message})
    }
}
