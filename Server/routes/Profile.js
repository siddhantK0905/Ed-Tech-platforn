const express = require("express");
const router = express.Router();


//Importing controllers
const {getEnrolledCourses,
       updateDisplayPicture ,
       getAllDetails,
       deleteAccount,
       updateProfile } = require ("../controllers/Profile");

const {auth} = require("../middlewares/auth")




//defining routes
router.put("/updateProfile",auth ,updateProfile);

router.post("/deleteProfile",auth,deleteAccount);

router.get("/getUserDetails",auth, getAllDetails);

router.get("/getEnrolledCourses",auth, getEnrolledCourses);

router.put("/updateDisplayPicture",auth, updateDisplayPicture);

//exporting the module
module.exports = router;