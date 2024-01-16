const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection");

require("dotenv").config()

exports.createCourse = async (req,res) => {
    try{
        //fetch data 
        let {courseName, courseDescription, whatYouWillLearn, price, category, tag, status, instructions,} = req.body;


        //fetch thumbnail
		    const thumbnail = req.files.thumbnailImage;
        console.log("Category Value is - ",category);


        //validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price  || !category || !tag || !instructions || !thumbnail
         ){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
      
          };

          
        if (!status || status === undefined) {
          status = "Draft";
          console.log("status value is",status)

        }

        //instructor from DB
        const userId = req.user.id
        console.log("User id is ",userId)
        const instructorDetails = await User.findById(userId,{
            accountType: "Instructor",
        });
        console.log("Instructor Details :",instructorDetails);
        //Instructor not found
        if(!instructorDetails){
            return res.status(401).json({
                success:false,
                message:"Instructor Not Found",
                error:err.message
            })
        }


        //Categorys is valid or not
          const categoryDetails = await Category.findById(category);
          if(!categoryDetails){
              return res.status(401).json({
                  success:false,
                  message:"category not Found"
              })
          }

        console.log("categoryDetails is - ",categoryDetails);
        //upload image on cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log("ThumbnailImage is ", thumbnailImage);

        //create a entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tag,
            category:categoryDetails._id,
            status:status,
            thumbnail:thumbnailImage.secure_url,
            instructions:instructions
        })

        //add course entry in user schema
        await User.findByIdAndUpdate({_id : instructorDetails._id},
                                     {
                                        $push:{
                                              courses :newCourse._id,
                                        }
                                     },
                                     {new:true}       
                                    );

        //add course in Category
          await Category.findByIdAndUpdate({_id:categoryDetails._id},
                                      {
                                          $push:{
                                            courses : newCourse._id,
                                          }
                                      },
                                      {new:true}
                                      ) 

        //return response                            
        return res.status(200).json({
            success:true,
            data:newCourse,
            message:"Course added successfully"
        })

    }
    catch(err){
        console.error(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in course creation"
        })
    }
}


//getAllCourses
exports.getAllCourses = async (req,res) => {
    try{
        //TODO
        const allCourses = await Course.find({},
            {
                courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviws:true,
                studentEnrolled:true,
            }).populate("instructor")
            .exec();
        console.log(allCourses)
        
        return res.status(200).json({
            success:true,
            message:"Data from all courses fetched successfully",
            data:allCourses,
        })


    }catch(err){
        return res.status(402).json({
            success:false,
            message:"Something went wrong in getAllCourses"
        })
    }
}


//getCourseDetails
exports.getCourseDetails = async (req,res) =>{
    try{
        //fetch ID
        const {courseId} = req.body;

        //Find course details
        const courseDetails = await Course.findById(
                                                    {_id:courseId})
                                                    .populate({
                                                        path:"instructor",
                                                        populate:{
                                                            path:"additionalDetails"
                                                        }
                                                    })
                                                    .populate("ratingAndReviws")
                                                    .populate("category")
                                                     .populate(
                                                         {
                                                             path:"courseContent",
                                                            // populate:{
                                                            //      path:"SubSection"
                                                            //  }
                                                         }
                                                     )
                                                    .exec()

        //Validation
        if(!courseDetails){
            res.status(401).json({
                success:false,
                message:`Could not find the course with ${courseDetails}`
            })
        }

        //return res
        res.status(200).json({
            success:true,
            message:"Course Details get successfully",
            data:courseDetails,
        })
    }
    
    catch(err){
        console.error(err);
        
        res.status(400).json({
            success:false,
            message:"Something went wrong in getAllCourse "
        })
    }
}

exports.editCourse = async (req, res) => {

    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)
    
        if (!course) {
          return res.status(404).json({ error: "Course not found" })
        }
    
        // If Thumbnail Image is found, update it
        if (req.files) {
          console.log("thumbnail update")
          const thumbnail = req.files.thumbnailImage
          const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
          course.thumbnail = thumbnailImage.secure_url
        }
    
        // Update only the fields that are present in the request body
        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
              course[key] = JSON.parse(updates[key])
            } else {
              course[key] = updates[key]
            }
          }
        }
    
        await course.save()
    
        const updatedCourse = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
        //  .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
    
        res.json({
          success: true,
          message: "Course updated successfully",
          data: updatedCourse,
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
}

exports.fetchInstructionCourses = async (req,res) => {
  try{

    const InstructorId = req.user.id;

    const instructorCourses = await Course.find({
      instructor:InstructorId
    }).sort({createdAt: -1});

    res.status(200).json({
      success:true,
      data:instructorCourses,
    })

    
  }
  catch(err){
    res.status(400).json({
      success:false,
      message:"Falied to retrive Instructor courses",
      error:err.message
    })    
  }
}

exports.deleteCourse = async (req, res) => {

  console.log("Into the delete course controller")
  
  const {courseId} = req.body
  console.log("IN DLETE Course controller course id is ",courseId)

  try{

    const course = await Course.findById(courseId);

    if(!course){
      return res.status(501).json({
        message:"Course Not Found"
      })
    }
  
    //unEnrolled the students from the course
  
      const enrolledStudents = course.studentEnrolled;

      console.log("Enrolled students are ", enrolledStudents)
  
      if(enrolledStudents){
        for(const studentId of enrolledStudents){
          await User.findByIdAndUpdate(studentId, {
            $pull: {
              course : courseId
            }
          })
        }
      }
  
      //Delete sections and sub sections
      const sections = course.courseContent;

      console.log("Sections are ", sections)
  
      for(const sectionId of sections){
  
        //deleting sub sections
        const section = await Section.findById(sectionId);
        if(section){
          const subSections = section.subSection;
          for(const subSectionId of subSections){
            await SubSection.findByIdAndDelete(subSectionId);
          }
        }
  
        //delete Section
        await Section.findByIdAndDelete(sectionId);
      }
  
    //delete the course
    await Course.findByIdAndDelete(courseId);
  
    return res.status(200).json({
      success:true,
      message:"Course deleted successfully"
    })

  }

  catch(err){
    console.error(err);
    res.status(500).json({
      success:false,
      message:"Error in deleteCourse controller",
      error:err.message
    })
  }
  
}

exports.getCourseFullDetails = async (req, res) => {
    
    let {courseId} = req.body;
    const {userId} = req.user.id;

    console.log("Into CourseDetails controller",courseId)


    try{

      const courseDetails = await Course.findOne({
        _id: courseId,
      })
      .populate({
        path:"instructor",
        populate:{
          path: "additionalDetails"
        },
      })
      .exec()

        console.log("After populating")
      const courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId
      })

      console.log("Course progress Count is ", courseProgressCount);

      if(!courseDetails){
        return res.status(500).json({
          success:false,
          message:'could not fetched Course details'
        })
      }


      let totalDurationInSeconds = 0;

      // courseDetails.courseContent.forEach((content) =>{
      //   content.subSection.forEach((subSection)=>{
      //     const timeDurationInSecond = parseInt(subSection.timeDuration);
      //     totalDurationInSeconds += timeDurationInSecond;
      //   })
      // })

      console.log(" Result from CourseDetails controller",courseDetails)

      return res.status(200).json({
        success:true,
        data:{
          courseDetails,
          totalDurationInSeconds,
        }
      })

    }
    catch(err){
      return res.status(501).json({
        success:false,
        message:err.message
      })
    }
}