const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req,res) => {
    try{
        //fetch the data
        const {name, description} = req.body;

        //Validation
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        //Create entry in DB
        const updatedDetails = await Category.create({
            name: name,
            description : description,
        })
        console.log(updatedDetails)

        //Response
        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    }
    catch(err){
        console.error(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in Category Creation"
        })
    }
}


//showAllCategories handler

exports.showAllCategories = async (req,res) => {
    try{
        const allData = await Category.find({}, {name:true, description:true,courses:true})

        console.log("All Cat data ",allData);
        return res.status(200).json({
            success:true,
            message:"All Tags returned successfully",
            allData: allData
        })
    }
    catch(err){
        console.error(err);
        return res.status(401).json({
            success:false,
            message:"Something went wrong in Tag Creation"
        })
    }
}


//category Page details

exports.categoryPageDetails = async (req,res) => {
    try{
        //get category id 
        const {categoryId} = req.body;
        //Selected courses for specific category
        console.log("INto categoryPageDetails at server with category id is ",categoryId )
        const selectedCourses = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "Published" },
            //populate: "ratingAndReviews",
          })
          .exec()   

        console.log("Selected courses are ", selectedCourses.courses)    
        
        //validation
        if(!selectedCourses){
            return res.status(400).json({
                success:false,
                message:"Data not found"
            })
        }

        if(selectedCourses.courses.length== 0){
            console.log("No courses for these category");
            return res.status(400).json({
                success:false,
                message:"No Courses found for these category"
            })
        }

        //get courses for different category
        const categoriesExceptedSelected = await Category.find({
                                                        _id : {$ne: categoryId}
                                                    })
                                                    let differentCategory = await Category.findOne(
                                                        categoriesExceptedSelected[getRandomInt(categoriesExceptedSelected.length)]
                                                        ._id
                                                    )
                                                    .populate({
                                                        path:"courses",
                                                        match:{ status: "Published"},
                                                    })
                                                    .exec()
        //get top 10 selling courses

        const allCategories = await Category.find()
             .populate({
                path:"courses",
                match :{ status:"Published"},
                populate:{
                    path:"instructor",
                },
             })
             .exec()
        // console.log("values of all Categories are - ", allCategories);
        const allCourses = allCategories.flatMap((category) => category.courses); // flat method create a copy of array
        // console.log("Value of allCourses are ", allCourses);
        const mostSellingCourses = allCourses
            .sort((a,b)=>b.sold - a.sold) //it gives high to low order of sold sorting
            .slice(0,10)


        //return response
        return res.status(200).json({
            success:true,
            Data: {
                selectedCourses,
                differentCategory,
                mostSellingCourses
            }
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

