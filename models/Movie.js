import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
      index: true 
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    genre:{
        type:String,
        required:true,
        trim: true
    },
    releaseYear:{
        type:Number,
        required:true,
    },
    director:{
        type:String,
        required:true,
        trim: true
    },
    rating:{
        type:Number,
        required:true,
        min: 0,
        max: 10
    },
    description:{
        type:String,
        trim: true
    }
},{
    timestamps:true
})

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
export default Movie;