const SubSection = require("../models/SubSection");
const Section = require("../models/Section");

const {uploadImageToCloudinary} = require("../utils/imageUploader")

require("dotenv").config();




exports.createSubSection = async (req,res) => {
    console.log("Into the Sub Section Controller")

    try{

        //fetch data 
        const{sectionId,title,description} = req.body;

        //fetch video 
       // const videoFile = req.files.videoFile;

        //validation
        if(!title || !description || !sectionId){
            return res.status(401).json({
                success: false,
                message : "All fields are required to filled"
            })
        }


        //upload the video
        //const videoDetails = await uploadImageToCloudinary(videoFile,process.env.FOLDER_NAME);


        //create a subSection
        const subSectionDetails = await SubSection.create({
            title: title,
            description: description,
           // timeDuration: `${videoDetails.duration}`,
           // videoUrl:videoDetails.secure_url,
        })

        //create entry in Section
        const updatedSection = await Section.findByIdAndUpdate(
                                        {_id: sectionId},
                                        {
                                    
                                            $push:{
                                                subSection : subSectionDetails._id
                                            }
                                        },{new: true})
                                        .populate("subSection");

        //return response
        return res.status(200).json({
            success: true,
            message : "SubSection created successfully",
            data: updatedSection
        })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message : "Something went wrong in creating SubSection",
        })
    }
}


// HW - update subSection

exports.updateSubSection = async (req,res) => {
    try{
        const{ sectionId , subSectionId, title, description} = req.body;
        const subSection = await SubSection.findById(subSectionId);
        console.log("Sub-Section Found", subSection)
        if(!subSection){
            return res.status(400).json({
                success:false,
                message: "subsection not founded"
            })
        }

        if(title !== undefined) {
            subSection.title = title;
        }

        if(description !== undefined) {
            subSection.description = description;
        }

        // if(req.files && req.files.video !== undefined){
        //     const video = req.files.video;
        //     const uploadDetails = await imageUploader.uploadImageToCloudinary(
        //         video,
        //         process.env.FOLDER_NAME,
        //     )
        //     subSection.videoUrl = uploadDetails.secure_url;
        //     subSection.timeDuration = `${uploadDetails.duration}`
        // }

        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.status(200).json({
            success:true,
            message: "sub Section Updated successfully",
            data:updatedSection
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message: "An error occurred while updating the sub section"
        })
    }
}


// HW - Delete SubSection

exports.deleteSubSectioin = async (req,res) => {
    try{
        //fetch Id
        const {subSectionId, sectionId} = req.body;
        //validate ID
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"please filled all the fields"
            })
        }

        //delete the entry of subsection from Section
        await Section.findByIdAndUpdate(
                                        {_id:sectionId},
                                        {
                                            $pull:{
                                                subSection: subSectionId,
                                            }
                                        },
                                        {new: true}
                                        );
        

        //Delete ID
        const subSection = await SubSection.findByIdAndDelete({_id:subSectionId});
        if(!subSection){
            return res.status(400).json({
                success:false,
                message:"SubSection not found"
            })
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection");
        //return res
        return res.status(200).json({
            success:true,
            data:updatedSection,
            message:"Sub Section Deleted successfully"
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong in deleting sub section"
        })
    }
}