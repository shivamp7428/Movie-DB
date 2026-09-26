import  Movie from '../models/Movie.js';


export const searchByDirector = async(req,res)=>{
    try {
        const {director} = req.body;
        if(!director){
            return res.status(400).json({success:false,message:"Bad Request"});
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const movies = await Movie.find({director: { $regex: director, $options: "i" }}).sort({createdAt:-1}).skip(skip).limit(limit);

        if(movies.length===0){
            return res.status(404).json({success:false,message:"Movies Not Found"})
        }
        return res.status(200).json({success:true,message:"Movie Fetched Successfully" ,count:movies.length, movies : movies})
    } catch (error) {
        console.log("Error in search Movie By director " , error)
        return res.status(500).json({success:false,message:error.message});
    }
}

export const searchByTitle = async(req,res)=>{
    try {
        const {title} = req.body;
        if(!title){
            return res.status(400).json({success:false,message:"Bad Request"});
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const movies = await Movie.find({title: { $regex: title, $options: "i" }}).sort({createdAt:-1}).skip(skip).limit(limit);
        if(movies.length===0){
            return res.status(404).json({success:false,message:"Movies Not Found"})
        }
        return res.status(200).json({success:true,message:"Movie Fetched Successfully" ,count:movies.length, movies : movies})
    } catch (error) {
        console.log("Error in search Movie By title " , error)
        return res.status(500).json({success:false,message:error.message});
    }
}

export const searchByYear = async(req,res)=>{
    try {
        const {year} = req.body;
        const yearRegex = /^\d{4}$/;
        if(!year || year===undefined || !yearRegex.test(year)){
            return res.status(400).json({success:false,message:"Bad Request"});
        }
        const releaseYear = parseInt(year,10);
        const currentYear = new Date().getFullYear();
        if(releaseYear<1900 || releaseYear > currentYear){
           return res.status(400).json({success:false,message:"Bad Request"})
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const movies = await Movie.find({releaseYear:releaseYear}).sort({createdAt:-1}).skip(skip).limit(limit);
        if(movies.length===0){
            return res.status(404).json({success:false,message:"Movies Not Found"})
        }
        return res.status(200).json({success:true,message:"Movie Fetched Successfully" ,count:movies.length, movies : movies})
    } catch (error) {
        console.log("Error in search Movie By year " , error)
        return res.status(500).json({success:false,message:error.message});
    }
}

export const searchByGenre = async(req,res)=>{
     try {
        const {genre} = req.body;
       
        if(!genre || genre===undefined){
            return res.status(400).json({success:false,message:"Bad Request"});
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const movies = await Movie.find({genre: { $regex: genre, $options: "i" }}).sort({createdAt:-1}).skip(skip).limit(limit);
        if(movies.length===0){
            return res.status(404).json({success:false,message:"Movies Not Found"})
        }
        return res.status(200).json({success:true,message:"Movie Fetched Successfully" ,count:movies.length, movies : movies})
    } catch (error) {
        console.log("Error in search Movie By genre " , error)
        return res.status(500).json({success:false,message:error.message});
    }
}

export const searchByRating = async(req,res)=>{
     try {
        const {rating} = req.body;
        
        if(!rating || rating===undefined){
            return res.status(400).json({success:false,message:"Bad Request"});
        }
        const newRating = parseInt(rating);

        if(newRating<1 || newRating > 10){
           return res.status(400).json({success:false,message:"Bad Request"})
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const movies = await Movie.find({rating:newRating}).sort({createdAt:-1}).skip(skip).limit(limit);

        if(movies.length===0){
            return res.status(404).json({success:false,message:"Movies Not Found"})
        }
        return res.status(200).json({success:true,message:"Movie Fetched Successfully" ,count:movies.length, movies : movies})
    } catch (error) {
        console.log("Error in search Movie By rating " , error)
        return res.status(500).json({success:false,message:error.message});
    }
}

export const searchMovies = async(req,res)=>{
    try {
        const {title,director,year,genre,rating} = req.body;
        if(title===undefined && director===undefined  && year===undefined && genre===undefined && rating===undefined){
            return res.status(400).json({success:false,message:"Missing Requrements"})
        }

        const yearRegex = /^\d{4}$/;
        const releaseYear = parseInt(year,10);
        const currentYear = new Date().getFullYear();

        const filter = {};
        if(year !== undefined) {
            if(!yearRegex.test(year) || releaseYear <= 1900 || releaseYear > currentYear) {
                return res.status(400).json({ success:false, message:"Invalid Year"});
            }
            filter.releaseYear = releaseYear;
        }

      if (rating !== undefined) {
          const newRating = parseInt(rating);
          if(newRating < 1 || newRating >10) {
            return res.status(400).json({ success:false, message:"Invalid Rating"});
          }
          filter.rating = newRating;
        }
        if(genre && genre!==undefined){
            filter.genre =  { $regex: genre, $options: "i" };
        }
        
        if(title && title!==undefined){
            filter.title =  { $regex: title, $options: "i" };
        }
        if(director && director!==undefined){
            filter.director =  { $regex: director, $options: "i" };
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;

        const movies = await Movie.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        if(movies.length===0){
           return res.status(404).json({success:false,message:"Movie Not Found"});
        }
        return res.status(200).json({success:true,message:"Movies Fetched Successfully ",count:movies.length , movies:movies})
    } catch (error) {
        console.log("Error in search Movies " , error)
        return res.status(500).json({success:false,message:error.message});
    }
}