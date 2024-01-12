const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//Create Rating and Reviews

exports.createRatingAndReview = async(req,res) =>{
    try{
        // fetch user Data
        const userId = req.user.id;

        //fetch data
        const {rating , review, courseId} = req.body;

        //Check user is already enrolled or not
        const courseDetails = await Course.findOne({
                                                    _id:courseId,
                                                    studentEnrolled : {$elemMatch: {$eq : userId}}
                                                 })
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message: "Student is not enrolled in the course"
            })
        }

        //check if user is already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                              user: userId,
                                                              course: courseId,
                                                            })
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message: "Course is already reviwed by the user"
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId,
        })

        //update course with rating and review
         await Course.findByIdAndUpdate({_id:courseId},
                                        {
                                            $push:{
                                                ratingAndReviws:ratingReview._id,
                                            }
                                        },
                                        {new: true})
        
        //Return Response
        return res.status(200).json({
            success:true,
            message: "rating and reviews created successfully",
            ratingReview,
        })

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message: "Something went wrong in creating Rating and Reviews"
        })
    }
}

//Get Average Rating
exports.getAverageRating = async (req,res) => {
    try{
        //get Course id
        const courseId = req.body.courseId;

        //calculate average rating
        const result = await RatingAndReview.aggregate([
                  {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    }
                  },
                  {
                    $group: {
                        _id:null,
                        averageRating : {$avg: "$rating"}
                    }
                  }

        ])

        //return result
        if(result.length > 0){
            return res.status(200).json({
                success:"true",
                averageRating : result[0].averageRating,
            })
        }

        //if no ratings and reviews exist
        return res.status(200).json({
            success:"true",
            message:"Average rating reviews are 0 , no rating given till now",
            averageRating :0,
        })

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:"false",
            message:"Someting went wrong in getAverageRating "
        })
    }
}


//getAllRating
exports.getAllRatings = async(req,res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating: "desc"})
                                                .populate(
                                                    {
                                                        path:"user",
                                                        select:"firstName lastName email image"
                                                    }
                                                )
                                                .populate(
                                                    {
                                                        path:"course",
                                                        select:"courseName"
                                                    }
                                                )
                                                .exec();
                                                ;
        if(!allReviews){
            return res.status(400).json({
                success:"false",
                message:"no Rating and reviews found "
            })
        }

        //return res
        return res.status(200).json({
            success:"True",
            message:"All Rating and Reviews fetched successfully "
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:"false",
            message:"Someting went wrong in getAllRating "
        })
    }
}