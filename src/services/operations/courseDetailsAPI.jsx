import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const{
    COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
 } = courseEndpoints

export const fetchCourseCategories = async () => {
    let result = [];


    try{
        const response = await apiConnector("GET",COURSE_CATEGORIES_API)
        console.log("Response from COURSE_CATEGORIES_API is", response);

        if(response?.data?.data){
            throw new Error ("Could not fetch course categories")
        }
        result = response?.data?.allData;
        console.log("Result of fetch Course API is ",result)
    }
    catch(err){
        console.log("Error in fetching COURSE_CATEGOROES_API", err);
        toast.error(err.message);
    }

    return result;
}

export const editCourseDetails = async (data, token) => {
    let result = null;
    try{
        const response = await apiConnector("POST",EDIT_COURSE_API, data,  {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })

        console.log("Response from editCourseDetails is ",response)
        if(!response?.data?.success){
            throw new Error ("Could not update the course details");
        }
        toast.success("Course details updated successfully");
        result = response?.data?.data

    }
    catch(err){
        console.log("Error in editCourse")
    }
    return result;
}


export const addCourseDetails = async (data, token) => {
     let result = null;
    try{
        console.log("Befor token verification in ADD_COURSE_DETAILS",token);
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })

          console.log("Response after addCourseDetails", response)
        if(!response?.data?.success){
            throw new Error("Error occur at addCourseDetails")
        }

        toast.success("Course added successfully")
        result = response?.data?.data;
        return result;
    }
    catch(err){
        console.log("ADD COURSE DETAILS ERROR...");
        console.error(err);
        toast.error(err.message);
    }
}

export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
    })
      console.log("CREATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Section")
      }
      toast.success("Course Section Created")
      result = response?.data?.updatedCourse
    } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

export const createSubSection = async (data, token) => {
    let result = null;

    console.log("Into the CourseDetails CSS");
    try{
        const response = await apiConnector("POST",CREATE_SUBSECTION_API, data, {
            Authorization:`Bearer ${token}`
        })

        console.log("Response from CREATE_SUB_SECTION",response)
        if(!response?.data?.success){
            throw Error ("Unable to create sub Section");
        }

        toast.success("Lecture added");
        result = response?.data?.data;
    }
    catch(err){
        console.error(err);
        console.log("Error in Create Sub Section");
        toast.error(err.message);
    }
    return result;
}

export const updateSection = async (data, token) => {
    let result = null

    console.log("Into Course details US")
    try{
        const response = await apiConnector ("POST", UPDATE_SECTION_API,data ,{
            Authorization:`Bearer ${token}`
        })

        console.log("Response from UPDATE_SECTION is ", response);
        if(!response?.data?.success){
            throw new Error("Unable to update section");
        }

        toast.success("Course section updated")
        result = response?.data?.Data;
    }
    catch(err){
        console.log("Update Section API error", err)
        console.error(err);
        toast.error(err.message);
    }

    return result;
}

export const updateSubSection = async (data, token) => {
    let result = null;

    try{
        const response = await apiConnector("POST",UPDATE_SUBSECTION_API, data , {
            Authorization:`Bearer ${token}`
        })

        console.log("Response from update sub section is ",response)
        if(!response?.data?.success){
            throw new Error(" Unable to Update UPDATE_SUB_SECTION");
        }

        toast.success("SubSection updated");
        result = response?.data?.data;

    }
    catch(err){
        console.error(err);
        console.log("Error in Update Sub Section");
        toast.error(err.message);
    }
    return result;
}

export const deleteSection = async (data, token) => {
    let result = null;

    try{
        const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("Unable to perform DELETE_SECTION");
        }

        toast.success("Course Section deleted successfully");

        result = response?.data?.data;
        return result;
    }
    catch(err){
        console.error(err);
        console.log("Error in delete section ", err);
        toast.error(err.message);
    }
}

export const deleteSubSection = async (data, token) => {
    let result = null;
    try{
        const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
            Authorization:`Bearer ${token}`
        })

        console.log("Response from Delete_SUB_SECTION", response);
        if(!response?.data?.success){
            throw new Error("Unable to DELETE_SUB_SECTION");
        }

        toast.success("Lecture deleted successfully");
        result = response?.data?.data;
    }
    catch(err){
        console.error(err);
        console.log("Error in deleteSub Section", err);
        toast.error(err.message);
    }
    return result;
}


export const fetchInstructorCourseDetails = async (token) =>{
    let result= [];
    try{
        const response = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
            Authorization:`Bearer ${token}`
        })

        console.log("Response from Fetch_Instructor_Courses is ",response);

        result = response?.data?.data;
        if(!result){
            throw new Error("Could not fetched Instructor courses");
        }

        return result;
    }
    catch(err){
        console.error(err);
        console.log("Instructor Course API error", err);
        toast.error(err.message);
    }
}


export const deleteCourse = async (data,token) => {
    try{
        const response = await apiConnector("DELETE",DELETE_COURSE_API, data ,{
            Authorization:`Bearer ${token}`
        })
        
        console.log("Response from delete course API is ", response);

        if(!response?.data?.success){
            throw new Error("Could not delete course")
        }
        toast.success("Course Deleted");

    }
    catch(err){
        console.log("DELETE COURSE API ERROR............", err)
        toast.error(err.message);

    }
}


export const getFullDetailsOfCourse = async (courseId, token) => {
    let result =[];
    try{
        const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{
            courseId,
        },
        {
            Authorization:`Bearer ${token}`
        }
        )
        console.log("Response in getFULL_DETAILS_OF_COURSE", response);

        if(!response?.data?.success){
            throw new Error ("Could not get full details")
        }

        result = response?.data;
    }
    catch(err){
        console.error(err);
        console.log("GET_COURSE_FULL_DETAILS_ERROR...",err)
        result = err.response.data;
    }

    return result;
}

