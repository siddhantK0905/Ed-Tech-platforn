const { default: mongoose } = require("mongoose");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const crypto = require("crypto")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");


//Initiate the order
exports.capturePayment = async(req, res) =>{
    const {courses} = req.body;
    const userId = req.user.id;

    console.log("Courses = ", courses);

    if(courses){

        let totalAmount = 0;

        for(let courseId of courses){

            try{
                const course = await Course.findById(courseId);
                if(!course){
                    return res.status(500).json({
                        success:false,
                        message:"Course not found"
                    })
                }

                const uid = new mongoose.Types.ObjectId(userId);

                if(course?.enrollStudent?.include(uid)){
                    return res.status(500).json({
                        success:false,
                        message:"Student is already Enrolled for the course"
                    })
                }
                
                totalAmount += course.price;
            }
            catch(err){
                return res.status(500).json({
                    success:false,
                    message:err.message
                })
            }
        }

        const options = {
            amount : totalAmount *100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString()
        }

        try{
            const paymentResponse = await instance.orders.create(options);
            return res.json({
                success:true,
                message:paymentResponse
            })
        }
        catch(err){
            console.log(err);
            return res.status(402).json({
                success:false,
                message:"Could not Initiate the order"
            })
        }

    }
    
    else{
        return res.status(200).json({
            success:false,
            message:"CourseId is not Available"
        })
    }
}

//Verify the signature
exports.verifyPayment = async (req,res) => {
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId){
            return res.status(500).json({success:false, message:"Payment Failed"})
        }

    const body = razorpay_order_id + '|' +razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256",process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if(razorpay_signature === expectedSignature){
        await enrollStudents(courses, userId, res);
        return res.status(200).json({success:true, message:"Payment Verified",})
    }

    return res.status(400).json({success:false, message:"Payment Failed"})


 }

//Enrolling student
 const enrollStudents = async (courses, userId, res) =>{
    
    if(!courses || ! userId){
        return res.status(500).json({success:false, message:"Can't get data of Courses and UserId"})
    }

    for(const courseId of courses) {

        try{
            //find course and add user in there studentEnrolled array  
            const enrolledCourse = Course.findOneAndUpdate({_id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true}
                )



            if(!enrolledCourse){
                return res.status(500).json({success:false, message:"Course not find"})
            }  

            //find student and update there course array
            const enrolledStudent = await User.findOneAndUpdate (
                {_id:userId},
                {
                    $push : {courses:courseId}
                },
                {new:true}
            )

            //Unable to get enrolled course value
            console.log("enrolled Courses value is ", enrolledCourse);
            console.log("Enrolled student is ", enrolledStudent)

            //send mail to each student 
            const mailResponse = await mailSender(
                    enrollStudents.email,
                    "Congratulations",
                    courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )

        }
        catch(err){
            return res.status(500).json({success:false, message:"Unable to make payment"})
        }
    }


 }


 exports.sendPaymentSuccessfullEmail= async(req, res) => {

    const {order_id, payment_id, amount} = req.body;

    const userId = req.user.id;

    if(!userId || !order_id || !payment_id || !amount){
        return res.json({
            success:false,
            message:"Provide all information require for sending email"
        })
    }


    try{
        const studentEnrolled = await User.findById(userId);
        console.log("Enrooled Student is ", studentEnrolled);

        await mailSender(
            studentEnrolled.email,
            `Payment Received`,
             paymentSuccessEmail(`${studentEnrolled.firstName}`,
             amount/100, order_id, payment_id)
        )
    }
    catch(error){   
        console.log("Error in sending email....", error);
        return res.status(500).json({
            success:false,
            message:"Could not send email"
        })
    }
 }

