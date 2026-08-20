import bcrypt from "bcryptjs";

import {User} from "./user.model.js";

import {generateToken} from "../../utils/jwt.js";




// REGISTER USER

export const registerUser = async(data)=>{


    const {
        name,
        email,
        phone,
        password
    } = data;



    const existingUser =
        await User.findOne({
            email
        });



    if(existingUser){

        throw new Error(
            "User already exists"
        );

    }



    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );



    const user =
        await User.create({

            name,

            email,

            phone,

            password:
            hashedPassword

        });



    const token =
        generateToken(
            user._id
        );



    return {

        user,

        token

    };


};





// LOGIN USER


export const loginUser = async(
    email,
    password
)=>{


    const user =
        await User.findOne({
            email
        });



    if(!user){

        throw new Error(
            "Invalid email or password"
        );

    }



    if(user.isBlocked){

        throw new Error(
            "Account blocked"
        );

    }



    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );



    if(!isMatch){

        throw new Error(
            "Invalid email or password"
        );

    }



    const token =
        generateToken(
            user._id
        );



    return {

        user,

        token

    };


};