import User from "../models/User.js";
import Movie from "../models/Movie.js";
import validator from 'validator';
import bcrypt from "bcrypt"

export const registerController = async(req,res)=>{
    try {
        const {name ,email , password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({success:false , message:"Bad Request"});
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({success:false , message:"Weak Password"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({success:false ,message:"Email or username is already exist"})
        }
        const hashPassword = await bcrypt.hash(password,10);
        
        const newUser =  new User({
            name:name,
            email:email,
            password:hashPassword
        });
        await newUser.save();
        const data = newUser;
        delete data.favorites;
        return res.status(201).json({success:true,message:"User create successfully",user:data})
    } catch (error) {
        console.log("Error in register controller ",error)
        return res.status(500).json({success:false,message:error.message})
    }
}

export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false , message:"Bad Request"});
        }
        const isExist = await User.findOne({email});
        if(!isExist){
            return res.status(401).json({success:false,message:"Invalid email or password."})
        }
        const isMatch = await bcrypt.compare(password,isExist.password);
        if(!isMatch){
            return res.status(401).json({success:false,message:"Invalid email or password."})
        }
        const userData = isExist.toObject();
        delete userData.password;
        delete userData.favorites;
        return res.status(200).json({success:true,message:"Login Successfully",User:userData})
    } catch (error) {
         console.log("Error in login controller ",error)
        return res.status(500).json({success:false,message:error.message})
    }
}

export const addFavoriteMovie = async(req,res)=>{
    try {
        const {userId,movieId} = req.params;
        const data = await User.findById(userId);
        data.favorites.push(movieId);
        await data.save();
        return res.status(200).json({success:true,message:"Movie Added In Favorite List"})
     } catch (error) {
        console.log("Error in add Favorite Movie controller ",error)
        return res.status(500).json({success:false,message:error.message})
    }
}

export const getFavoriteMovie = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const {userId} = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const favoriteMovies = await Movie.find({ _id: { $in: user.favorites } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "name email");

        return res.status(200).json({success:true,message:"Favorite Movies Fetched Successfully",count: favoriteMovies.length,movies: favoriteMovies})
    } catch (error) {
         console.log("Error in get favorite Movie controller ",error)
        return res.status(500).json({success:false,message:error.message})
    }
}


export const updateController = async(req,res)=>{
    try {
        const {userId} = req.params;
        const {newName} = req.body;
        if(newName === undefined || !newName){
            return res.status(400).json({success:false ,message:"Bad Request"})
        }
        const data = await User.findById({_id:userId});
        if(!data){
            return res.status(404).json({success:false,message:"User Not Found"})
        }
        data.name = newName;
        await data.save();
        return res.status(200).json({success:true,message:"User updated Successfully"})
    } catch (error) {
        console.log("Error in Update controller ",error)
        return res.status(500).json({success:false,message:error.message})
    }
}

export const deleteController = async(req,res)=>{
    try {
        const {userId} = req.params;
        const data = await User.findById(userId);
        if (!data) {
          return res.status(404).json({success: false, message: "User not found"});
        }
        const  user = data;
        await data.deleteOne();
        return res.status(200).json({success:true,message:"User deleted Successfully",deletedUser : user})
    } catch (error) {
        console.log("Error in delete controller ",error)
        return res.status(500).json({success:false,message:error.message})
    }
}