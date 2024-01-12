const Profile = require("../models/Profile");
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

require("dotenv").config();

exports.updateProfile = async (req,res) => {
    try{
        //data fetch
        const {gender, contactNumber, dateOfBirth="", about=""} = req.body;

        //fetch user id
        const id = req.user.id;
        //validation
        if(!gender || !contactNumber ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //find user details
        const userDetails =await User.findById(id);
        //get profile id
        const profileId = userDetails.additionalDetails;
        //fetch profile details from profile id
        const profileDetails = await Profile.findById(profileId);

        //update profile details
        profileDetails.dateOfBirth =dateOfBirth,
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data : profileDetails,
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong in updating profile"
        })
    }
}


//delete Account
exports.deleteAccount = async (req,res) => {
    try{
        //get user id
        const userId = req.user.id;

        //get user details
        const userDetails = await User.findById(userId);

        //validation
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not exist"
            })
        }

        //get profile Details and delete profile
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete({_id:profileId})

        //delete user 
        await User.findByIdAndDelete({_id:userId});

        //return response
        return res.status(200).json({
            success:false,
            message:"Account deleted successfully"
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong while deleting profile"
        })
    }
}


//get user all details

exports.getAllDetails = async (req,res) => {
    try{
        //fetch user id
        const userId = req.user.id;
        //get user details
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        
        //return res
        return res.status(200).json({
            success:true,
            message:"user All details fetched successfully",
            Data:userDetails
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while getting all details"
        })
    }
}

//update Display picture
exports.updateDisplayPicture = async(req,res) => {
    try{
        //fetch image
        const file = req.files.DisplayPicture;

         
        //fetch user details
        const userId = req.user.id;

        //upload image on cloudinary
        const uploadedImage = await uploadImageToCloudinary(
            file,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        //update the user 
        const userDetails = await User.findByIdAndUpdate(
                                                    {_id: userId},
                                                    {
                                                        image: uploadedImage.secure_url
                                                    },
                                                    {new: true})
        

        //return response
        return res.status(200).json({
            success:true,
            message:"Message updated successfully",
            data:userDetails
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:true,
            message:err.message,
        })
    }
}


//get enrolled courses
exports.getEnrolledCourses = async(req, res) => {
    try{
        //fetch user id
        const userId = req.user.id;

        //display all courses 
        const userDetails = await User.findOne({_id: userId})
                                        .populate("courses")
                                        .exec();

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message: `Could not found user details`
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            data: userDetails.courses,
        })
    }
    catch(err){
        console.error(err);
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }
}