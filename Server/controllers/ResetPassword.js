const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto")

//Resetpassword token

exports.resetPasswordToken = async (req,res) => {
    try{

        //fetch email
        const email = req.body.email;
        
        //Validation
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Filled all the fields"
            })
        }

        const user = await User.findOne({email:email})
        
        //user not exist
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your email is not registered with us"
            })
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex");

        //strored token in DB
        const updatedDetails = await User.findOneAndUpdate({email:email},
                                                            {
                                                                token:token,
                                                                resetPasswordExpires:Date.now() + 5*60*1000
                                                            },
                                                            {new:true})
    
        //Create URL
        const url = `http://localhost:3000/update-password/${token}`

        //sending mail
        await mailSender(email,
                        "Password Reset Link",
                        `password Reset link is ${url}. Please click this url to reset your password.`);
        
        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset token is sent through mail successfully"
        })
    }
    catch(err){
        console.error(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in resetPasswordToken"
        })
    }
}


//ResetPassword
exports.resetPassword = async (req,res) => {

    try {
		const { password, confirmPassword, token } = req.body;

        console.log("passwod =",password);
        console.log("cpasswod=",confirmPassword);

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}


    // try{
    //     //fetch the data
        
    //     const {password,confirmPassword,token} = req.body;
    //     console.log("passwod =",password);
    //     console.log("cpasswod=",confirmPassword);
        
    //     //validation
    //     // if(password !== confirmPassword){
    //     //     return res.status(401).json({
    //     //         success:false,
    //     //         message:"Password not matched"
    //     //     })
    //     // }

    //     //get user details from DB using token
    //     const user = await User.findOne({token : token})
    //     //user not found
    //     if(!user){
    //         return res.status(401).json({
    //             success:false,
    //             message:"Invalid token"
    //         })
    //     }

    //     //Token time check
    //     if(!(user.resetPasswordExpires > Date.now())){
    //         return res.status(401).json({
    //             success:false,
    //             message:"Token is expired please regenerate your token"
    //         })
    //     }

    //     //hash password
    //     const hashpass = await bcrypt.hash(password,10);

    //     //update the password
    //     const result = await User.findOneAndUpdate(
    //         {token:token},
    //         {
    //             password : hashpass,
    //         },
    //         {new:true}
    //     )


    //     //return the response
    //     return res.status(200).json({
    //         success:true,
    //         message:"Password reset successfully",
    //         Data:result
    //     })
    // }
    // catch(err){
    //     console.error(err);
    //     return res.status(401).json({
    //         success:false,
    //         message:"Something went wrong in ResetPassword"
    //     })
    // }
}