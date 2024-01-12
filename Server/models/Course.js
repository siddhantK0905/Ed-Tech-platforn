const mongoose = require("mongoose");

const Course = new mongoose.Schema({

    courseName : {
        type: String,
        required: true,
        trim : true,
    },
    courseDescription : {
        type : String,
        required:true,
        trim: true,
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    whatYouWillLearn : {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReviws : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews"
        }
    ],
    price :{
        type: Number,
    },
    thumbnail : {
        type : String,
    },
    category :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    tag : {
        type: [String],
        required:true,
    },
    studentEnrolled: [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required :true,
    }],
    instructions: {
        type: [String],
    },
    status: {
        type : [String],
        enum :["Draft", "Published"]
    },

})


module.exports = mongoose.model("Course",Course);