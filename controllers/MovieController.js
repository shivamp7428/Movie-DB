import  Movie from '../models/movie.js';


export const addMovieController = async(req,res)=>{
    try {
        const {userId} = req.params;
        const {title, genre, releaseYear, director, rating, description} = req.body;

        if(!title || !genre || !releaseYear || !director || !rating){
           return res.status(404).json({success:false,message:"Not Found"});
        }
        
       const newMovie = new Movie({
                user:userId,
                title: title,
                genre: genre,
                releaseYear: releaseYear,
                director: director,
                rating: rating,
                description: description
            });

    await newMovie.save();
    return res.status(201).json({success:true,message:"Movie added Successfully",movie:newMovie})        
    } catch (error) {
        console.log("Error in add Movie controller " , error)
        return res.status(500).json({success:false , message:error.message})
    }
}

export const getAllMovie = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const data = await Movie.find({}).sort({createdAt:-1}).skip(skip).limit(limit).populate("user", "name email");
        if(!data){
            return res.status(404).json({success:false, message:"Not Found Movies"})
        }
        return res.status(200).json({
            success:true, 
            message:"Movie fetched successfully",
            length:data.length,
            Movies:data
        })
    } catch (error) {
        console.log("Error in get All ontroller " , error)
        return res.status(500).json({success:false , message:error.message})
    }
}

export const getMovieById = async(req,res)=>{
    try {
        const {movieId} = req.params;
        const data  = await Movie.findById(movieId);
        if(!data){
            return res.status(404).json({success:false, message:"Not Found Movie"})
        }            
        return res.status(200).json({success:true ,message:"Movie fetched Successfully",Movie:data})    
    } catch (error) {
        console.log("Error in get Movie By id controller " , error)
        return res.status(500).json({success:false , message:error.message})
    }
}

export const getMovieByUser = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;

        const {userId} = req.params;

        const data = await Movie.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "name email");

        if(!data  || data.length === 0){
            return res.status(404).json({success:false,message:"Movie Not Found"});
        }
        return res.status(200).json({success:true,message:"Movie Fetched Successfully",count:data.length,movies:data})
    } catch (error) {
        console.log("Error in get Movie By user controller " , error)
        return res.status(500).json({success:false , message:error.message})  
    }
}

export const updateMovie = async(req, res)=>{
    try {
        const {movieId} = req.params;
        const{title, genre, releaseYear, director, rating, description} = req.body;
        if(title===undefined && genre===undefined && releaseYear===undefined &&
           director===undefined && rating===undefined && description===undefined){
            return res.status(400).json({success:false,message:"Bad Request"})
        }
        
        const data = await Movie.findById(movieId);
         if(!data){
            return res.status(404).json({success:false, message:"Not Found Movie"})
        }  
        if(title){
            data.title = title;
        }    
        if(genre){
            data.genre = genre;
        }    
        if(releaseYear !== undefined){
            data.releaseYear = releaseYear;
        }
        if(director){
            data.director = director;
        }
        if(rating !== undefined){
            data.rating = rating;
        }
        if(description){
            data.description = description;
        }
        await data.save();
        return res.status(200).json({success:true,message:"Movie Updated Successfully",Movie:data})
    } catch (error) {
        console.log("Error in update movie controller " , error)
        return res.status(500).json({success:false , message:error.message})
    }
}

export const deleteMovie = async(req,res)=>{
    try {
        const {movieId} = req.params;
        const data = await Movie.findById(movieId);
        if(!data){
            return res.status(404).json({success:false, message:"Not Found Movie"})
        }
        await data.deleteOne();
        return res.status(200).json({success:true,message:"Movie Deleted Successfully"});
    }catch (error) {
        console.log("Error in update movie controller " , error)
        return res.status(500).json({success:false , message:error.message})
    }
}
