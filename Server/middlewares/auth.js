const User = require("../models/User");
const JWT = require("jsonwebtoken")
require("dotenv").config();

//auth
exports.auth = async (req,res,next) => {
    console.log("........Into the auth middleware........")
    try{
        //fetch token
        // const token = req.cookies.token || req.body.token || req.header("Authorization").repalce("Bearer ","");

        
        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");

        
        console.log("Token in Auth middleware", token)
        //Token not found
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }

        //token verification
        try{
            console.log("JWT secret is ", process.env.JWT_SECRET);

            const decode = JWT.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err){
            console.error(err);
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
    }
    catch(err){
        console.error(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in Auth middleware"
        })
    }

    next();
}


//isStudent
exports.isStudent = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Student"
            })
        }
    }
    catch{
        console.error(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in isStudent"
        })
    }
    next();
}

//isInstructor
exports.isInstructor = async (req,res,next) => {
    console.log(".......Into the isInstructor middleware.........");
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Instructor"
            })
        }
    }
    catch{
        console.error(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in isInstructor"
        })
    }
    next();
}


//isAdmin
exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route only for Admin"
            })
        }
    }
    catch{
        console.error(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in Admin"
        })
    }
    next();
}

