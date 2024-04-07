import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

const {GET_USER_ENROLLED_COURSES_API} = profileEndpoints

export async function getUserEnrolledCourses(token){
    let result = []
    try{

        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
              } 
        )

        console.log("Response in ProfileAPI", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        
        result = response.data.data
    }
    catch(err){
        console.log("Error at getting Enrolled courses details", err);
    }

    return result;
}