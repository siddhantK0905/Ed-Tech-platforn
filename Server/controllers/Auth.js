const OTP = require("../models/OTP");
const User = require("../models/User");
const Profile = require("../models/Profile")
const otp_generator = require("otp-generator")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const mailSender = require("../utils/mailSender")
const {passwordUpadated} = require("../mail/templates/passwordUpdate")
require("dotenv").config();

//Send OTP
exports.sendOTP = async (req, res) => {
    try{
        //Fetch the eamil from req body
        const{email} = req.body;

        //Check field is empty or not
        if(!email){
            return res.json({
                success:false,
                message: " Enter the email"
            })
        }

        //check user is already exit
        const dbUser = await User.findOne({email});

        //if user exist return the response
        if(dbUser){
            return res.json({
                success: false,
                message: "User is already exits"
            })
        }

        //Generate OTP
        let otp = otp_generator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        //check OTP is unique or not
        let result = await OTP.findOne({ otp: otp});
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
         while(result){
             otp = otp_generator.generate(6,{
                 upperCaseAlphabets:false,
             })
         }

        //store otp in DB
        const payload = {email, otp};
        const otpBody = await OTP.create(payload)
        console.log("OTP Body",otpBody);

        //Return the response
        return res.status(200).json({
            success:true,
            message:"OTP Generated successfully",
            otp,
        })
    }   
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while generating OTP",
        })
    }
}


exports.signUp = async (req,res) => {
    try{
        //fetch all the data from req
        const{
            firstName,
            lastName,
            email,
            contactNumber,
            password,
            confirmPassword,
            otp,
            accountType
            } = req.body;

            console.log(firstName,lastName,email,password,confirmPassword)
        //perform validation
        if(!firstName || !lastName || !email || !password || !confirmPassword ){
            return res.json({
                success:false,
                message:"Plz Filled all the fields"
            })
        }

        //Password match
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password not match"
            })
        }

        //User already exit or not
        const dbuser = await User.findOne({email})
        if(dbuser){
            return res.json({
                success:false,
                message:"User is already exist"
            })
        }

        //find most recent OTP for the user
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        //validate OTP
        if(recentOtp.length === 0){
            return res.status(500).json({
                success:false,
                message:"OTP not found"
            })
        }else if(otp != recentOtp.otp){
            //invalid otp
            return res.status(500).json({
                success:false,
                message:"OTP does not matched"
            })
        }


        //Hash the passwod
        const hashpass = await bcrypt.hash(password,10)

        //store in databse

        const profileDatails = await Profile.create({
            gender:null,
            contactNumber:null,
            dateOfBirth:null,
            about:null,
        }
        )
        const payload = {
            firstName,
            lastName,
            email,
            password:hashpass,
            accountType,
            additionalDetails : profileDatails.id,
            image:`https://api.dicebear.com/5.x/initials/svg/seed=${firstName} ${lastName}`,
        }

        const dbStore = await User.create(payload);
        console.log(payload);

        return res.status(200).json({
            success:true,
            message:"User Sign Up Successfully",
            dbStore,
        })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in SignUp"
        })
    }
}


//Login 
exports.login = async(req,res) => {
    try{
        const {email, password} = req.body;

        console.log(email,password)
        //Validation
        if(!email || !password){
            return res.status(500).json({
                success:false,
                message:"Filled all the fields"
            })
        }

        const existUser = await User.findOne({email}).populate("additionalDetails");
        
        //User VAlidation
        if(!existUser){
            return res.status(500).json({
                success:false,
                message:"Not Valid user"
            }) 
        }

        //verify user by password matching and send JSON token
        const payload = {
            email: existUser.email,
            id : existUser.id,
            accountType : existUser.accountType,
        }

        if(await bcrypt.compare(password, existUser.password)){

            //generate JWT Token
            let token = JWT.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
        existUser.token = token;
        existUser.password = undefined;

        //create a cookie
        const options = {
            expires : new Date (Date.now() + 3*24*60*60*1000),
            httpOnly : true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            existUser,
            message:"Login done successfully"
        })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password not matched"
            })
        }

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in Login"
        })
    }
}


//Change Password
exports.changePassword = async (req,res) => {
    try{
        //fetch the data
        const{oldPassword,newPassword,confirmPassword} = req.body;

        //Get the user details
        const userDetails = await User.findById(req.user.id);

        //perform Validation
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Please Filled all the data"
            })
        }

        //old password matching with existing user
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            });
        }
        
        //checking newPassword and confirm password
        if(confirmPassword !== newPassword){
            return res.status(401).json({
                success:false,
                message:"Password not matched with confirm password"
            })
        }



        //Update password in DB
        const encryptedPassword = await bcrypt.hash(newPassword,10);
        const upadateUserDetails = await User.findOneAndUpdate({email : email},
                                                           {password : encryptedPassword},
                                                           {new:true})
        console.log(upadateUserDetails);

        //Sending mail 
        try{
            const emailResponse = await mailSender(
                upadateUserDetails.email,
                passwordUpadated(
                    upadateUserDetails.email,
                    `password updated successfully for ${upadateUserDetails.firstName} ${upadateUserDetails.lastName} `
                )
            );
            console.log("Email sent successfully:",emailResponse.response);
        }
        catch(err){
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }
        // Return success response
		return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in Change Password"
        })
    }
}