import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:15
    },
    favorites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie"
    }]
},{
    timestamps:true
})

const User = mongoose.models.User || mongoose.model("User",UserSchema);
export default User;