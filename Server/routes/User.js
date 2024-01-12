const express = require("express");
const router = express.Router();



//import controller
const {login,signUp, sendOTP, changePassword, } = require("../controllers/Auth")

const{auth} = require("../middlewares/auth")
const {resetPasswordToken,resetPassword} = require("../controllers/ResetPassword")



//Routes for login , signUp and authentication
router.post("/login",login);

 //Route for sign Up
 router.post("/signup",signUp);

 //Route for sending otp to user email
 router.post("/sendotp",sendOTP);

 //chanding password
 router.post("/changepassword",auth,changePassword);

 

//      Reset Password 
 
 // Route for generating a reset password token
 router.post("/reset-password-token",resetPasswordToken);

 // Route for resetting user's password after verification
 router.post("/reset-password",resetPassword);


//Export the router
module.exports = router
