import mongoose from "mongoose";


const userSchema = new mongoose.Schema(

{
    name:{
        type:String,
        required:true,
        trim:true
    },


    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },


    phone:{
        type:String,
        required:true
    },


    password:{
        type:String,
        required:true,
        minlength:6
    },


    role:{
        type:String,
        enum:[
            "CUSTOMER",
            "SUPER_ADMIN"
        ],
        default:"CUSTOMER"
    },


    profileImage:{
        type:String,
        default:""
    },


    isBlocked:{
        type:Boolean,
        default:false
    }

},

{
    timestamps:true
}

);



export const User = mongoose.model(
    "User",
    userSchema
);