const express = require("express");
const router = express.Router();

//importing 
const {createCourse, getAllCourses, getCourseDetails, editCourse, fetchInstructionCourses, deleteCourse, getCourseFullDetails, } = require("../controllers/Course");
// const {createSection, updateSection, deleteSection} = require("../controllers/Section");
// const {createSection} = require ("../controllers/Section");
const {
    createSection,
    updateSection,
    deleteSection,
  } = require("../controllers/Section")
  

const {createSubSection, updateSubSection, deleteSubSectioin} = require("../controllers/SubSection")
const {auth , isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Category");



const {createRatingAndReview, getAverageRating , getAllRatings} = require("../controllers/RatingAndReview");


//defining routes

router.post("/createCourse",auth, isInstructor, createCourse);
router.post("/editCourse",auth, isInstructor,editCourse)
//add a section to a course
router.post("/addSection",auth, isInstructor, createSection);
//update a section to a course
router.post("/updateSection",auth,isInstructor,updateSection);
//Delete a Section
router.delete("/deleteSection",auth,isInstructor,deleteSection)
//add subSecton
router.post("/addSubSection",auth,isInstructor, createSubSection)
//update a subSection
router.post("/updateSubSection",auth, isInstructor, updateSubSection);
//delete a subSection
router.delete("/deleteSubSection",auth, isInstructor, deleteSubSectioin);
//get all details of courses
router.get("/getAllCourses",getAllCourses);
//get details of specific courses
router.get("/getCourseDetails",getCourseDetails);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, fetchInstructionCourses)
//delete course
router.delete("/deleteCourse", deleteCourse)
//edit-Course
router.post("/getFullCourseDetails",auth, getCourseFullDetails)




//               Category routes (only for Admin)

router.post("/createCategory",auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails)



//             Rating And Reviews
router.post("/createRating",auth, isStudent, createRatingAndReview );
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatings);


//export module
module.exports = router;