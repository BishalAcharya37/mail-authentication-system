import express from "express";
import { User } from "../models/user.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import {  generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendForgetPasswordEmail, sendResetSucessEmail } from "../mailtrap/emails.js";
import { send } from "process";

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

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({sucess: true, message: "Email verified sucessfully",
            user: {
                ...user._doc,
                password: undefined,

            }
        });



    } catch (error) {
        res.status(400).json({message: "Cant get any code"});
        
    }

};


export const signIn = async (req,res)=>{
 const {email, password}= req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({sucess: false, message: "Invalid Credentials"});

        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({sucess: false, message: "Password is not valid"});

        }

        generateTokenAndSetCookie(res,user._id);
        user.lastLogin= new Date();
        await user.save();

        res.status(200).json({
            sucess: true, 
            message: "Logged In Sucessfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

        
    } catch (error) {
        console.log("Error in login", error);
        res.status(400).json({sucess: false, message: error.message});

        
    }
};


export const logout = async (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({sucess: true, message: "Logged Out Successfully"});

};


export const forgetPassword= async (req,res)=>{
    const {email}= req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({sucess:false, message: "User Not Found"});
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt= Date.now()+ 1*60 *60 *1000;

        user.resetPasswordToken= resetToken;
        user.resetPasswordExpiresAt= resetTokenExpiresAt;

        await user.save();

        await sendForgetPasswordEmail(user.email, `${process.env.CLIENT_URL}/forget-password/${resetToken}`);

        res.status(200).json({sucess: true, message:"Password reset link sent to your email"});



    } catch (error) {
        console.log("Error in forgot password", error);
        res.status(400).json({sucess: false, message: error.message});

        
    }
  
    
};


export const resetYourPassword = async (req,res)=> {
    try {
        const {rtoken}= req.params;
        const {password}= req.body;

        const user = await User.findOne({
            resetPasswordToken: rtoken,
            resetPasswordExpiresAt: {$gt: Date.now()},

        });

        if(!user){
            return res.status(400).json({sucess: false, message: "Invalid or expired reset token"});

        }

        //update password
        const hashPassword= await bcrypt.hash(password, 10);
        user.password= hashPassword;
        user.resetPasswordExpiresAt=undefined;
        user.resetPasswordToken= undefined,

        await user.save();
        await sendResetSucessEmail(user.email);

        res.status(200).json({sucess: true, message: "Passowrd reset successfully"});



    } catch (error) {
        console.log("Error while reseteting password", error);
        res.status(400).json({sucess: false, message: error.message});

    }


};


export const checkAuth = async (req,res)=>{
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({success: false, message: "User Not Found"});

        }

        res.status(200).json({sucess: true, user:{
            ...user._doc, 
            password: undefined
        }});

    } catch (error) {
        console.log("Error chekcing auth", error);
        
    }

};