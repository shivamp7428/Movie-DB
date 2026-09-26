import  Movie from '../models/Movie.js';
import mongoose from 'mongoose';
     
export const isMovieID = async(req,res,next)=>{
    try {
      const {movieId} = req.params;
      if(!mongoose.isValidObjectId(movieId)){
         return res.status(400).json({success:false ,message:"Bad Request"})
      }
      const isExists = await Movie.findById(movieId);
      if(!isExists){
        return res.status(404).json({success:false,message:"Movie Not Found"})
      }
      next();
    } catch (error) {
     console.log("Error in isMovie Id middleware ",error)
    return res.status(500).json({success:false,message:error.message})
    }
} 
