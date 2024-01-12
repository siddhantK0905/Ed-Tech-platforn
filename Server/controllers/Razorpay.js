const { default: mongoose } = require("mongoose");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const {mailSender} = require("../utils/mailSender")


//Capture the payment and initiate the order

exports.capturePayment = async (req,res) => {

    //fetch courseId and UserId
    const {course_id} = req.body;

    const userId = req.user.id;

    //perform validation
    //valid course id
    if(!course_id){
        return res.status(400).json({
            success: false,
            message:"course id not found"
        })
    }
    //valid course details
    try{
        const course = await Course.findById(course_id);
        //validate the course datails
        if(!course){
            return res.status(400).json({
                success: false,
                message:"course details not found"
            }) 
        }

        //check user is already Enrolled or not
        const uid = new mongoose.Types.ObjectId(userId);
        if(Course.studentEnrolled.includes(uid)){
            return res.status(400).json({
                success: false,
                message:"Student is already enrolled to the course"
            }) 
        }
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success: false,
            message: err.message,
        }) 
    }

    //order create
    const amount = Course.price;
    const currency = "INR"
    const options = {
        amount: amount*100,
        currency,
        receipt:Math.random(Date.now).toString(),
        notes : {
            courseId : course_id,
            userId
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);

        //return res
        return res.status(200).json({
            success:true,
            courseName : course.courseName,
            courseDescription :course.courseDescription,
            thubmnail:course.thumbnail,
            order_id : paymentResponse.id,
            currency: paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success: false,
            message: "Could not initiate order",
        }) 
    }

}



//Verify the signature of Razorpay and Server

exports.verifySignature = async (req,res) => {
    const webhookSecret ="12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Signature authorized");
        try{
            const {courseId,userId} = req.body.payload.payment.entity.notes;
            
            //fulfill the action

            // find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                                                                {_id:courseId},
                                                                {
                                                                    $push:{
                                                                        studentEnrolled:userId
                                                                    }
                                                                },
                                                                {new:true});
            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:"Course not found"
                })
            }

            //find the student and add the course to the their list of courses
            const enrollStudent = await User.findByIdAndUpdate(
                                                                {_id:userId},
                                                                {$push: {
                                                                    courses:courseId,
                                                                }},
                                                                {new:true} );
            
            console.log(enrollStudent);

            //send mail of confirmation
            const mailResponse = await mailSender(
                                                enrollStudent.email,
                                                "Congratulation",
                                                "Congratulation , you are onboarded"
            );

            console.log(mailResponse)
            return res.status(200).json({
                success:true,
                message:"Signature verified and course added"
            })

        }
        catch(err){
            console.error(err);
            return res.status(400).json({
                success:false,
                message:err.message
            })
        }

    }

    else{
        return res.status(402).json({
            success:false,
            message:"Signature not verified"
        })
    }

}