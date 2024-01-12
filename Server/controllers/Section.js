const Section = require("../models/Section")
const Course = require("../models/Course")



exports.createSection = async (req,res) => {
    console.log("Into the create section controller")
    try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}

}

//Update the Section

exports.updateSection = async (req, res) => {
    try{
        //fetch the data
        const {sectionName,sectionId,courseId} = req.body;
        
        //validation
        if(!sectionName || !sectionId){
            return res.status(404).json({
                success: false,
                message : "Missing parameters"
            })
        }

        //update the data
         const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName : sectionName},{new:true})

         const course = await Course.findById(courseId)
         .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
         }).exec()

        //return res
        return res.status(200).json({
            success: true,
            message : "Section updated successfully",
            Data:course
        })
    }
    catch(err){
        console.error(err);
        return res.status(404).json({
            success: false,
            message : "Something went wrong while creating section"
        })
    }
}



//delete Section

exports.deleteSection = async (req,res) => {
    try{
        //getID
        const {sectionId,courseId} = req.body;

        const result = await Course.findByIdAndUpdate(
                                                        {_id:courseId},
                                                        {
                                                            $pull:{
                                                                courseContent : sectionId
                                                            }
                                                        },
                                                        {new:true}
        )

        //delete the section
        await Section.findByIdAndDelete(sectionId);

        //return res
        return res.status(200).json({
            success: true,
            message : "Section deleted successfully",
            data:result
        })
    }
    catch(err){
        console.error(err);
        return res.status(404).json({
            success: false,
            message : "Something went wrong while deleting section"
        })
    }
}