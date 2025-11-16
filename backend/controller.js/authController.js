import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import {  generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
export const signUp = async(req,res)=>{
    const {email, password, name} = req.body;
    try{
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({sucess: false, message: "User already Exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
    const verificationToken =  Math.floor(100000+ Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await user.save();
        generateTokenAndSetCookie(res, user._id);

       await sendVerificationEmail(user.email, verificationToken);
        res.status(201).json({sucess: true, message: "User Created sucessfully", user:{
            ...user._doc,
            password: undefined,
            
        },});
    }catch(error){
        res.status(400).json({sucess: false, message: error.message});

    }
};


export const verifyEmail = async (req, res)=>{
    // 1 2 3 4 5 6
    const {code}= req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({sucess: false, message: "Invalid or expired verification code"})
        }

        user.isVerified=true;
        user.verificationToken =undefined;
        user.verificationTokenExpiresAt= undefined;
        await user.save();



    } catch (error) {
        res.status(400).json({message: "Cant get any code"});
        
    }

};


export const signIn = async (req,res)=>{
    res.send("Login route");
};


export const logout = async (req,res)=>{
    res.send("Logout route");
};