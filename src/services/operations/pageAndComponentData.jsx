import toast from "react-hot-toast";
import{apiConnector} from "../apiConnector"
import { catalogData } from "../apis";

export const getCatalogPageData = async(categoryId) => {

    let result = [];
    try{
        const response = await apiConnector("POST", "http://localhost:4000/api/v1/course/getCategoryPageDetails", 
        {categoryId: categoryId,});

        console.log("response from getCatalogPageData ",response)

        if(!response?.data?.success)
            throw new Error("Could not fetch Category page Data")


        result = response?.data;
    }
    catch(err){

        console.log("Catalog page data api error", err)
        toast.error(err.message)
        result = err.response.data;
    }
    return result;
}