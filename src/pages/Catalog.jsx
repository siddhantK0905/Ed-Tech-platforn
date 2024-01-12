import React, { useEffect, useState } from 'react'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { useParams } from 'react-router-dom';
import { categories } from '../services/apis';
import {apiConnector} from "../services/apiConnector"
import { getCatalogPageData } from '../services/operations/pageAndComponentData';

const Catalog = () => {

  const [categoryPageData, setCategoryPageData] = useState(null);
  const {catalogName} = useParams();
  const [categoryId, setCategoryId] = useState();

  useEffect(()=>{

    const getCategories = async () =>{
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Response from getCategories is ", res);
      const category_id = 
      res?.data?.allData?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);

      console.log("Category id is",categoryId);
    }
    getCategories();
  },[catalogName]);

  useEffect(()=>{
    const getCategoryDetails = async() => {

      const res = await getCatalogPageData(categoryId);
      console.log(res);
      setCategoryPageData(res);
    }
    getCategoryDetails();
  },[categoryId])

  return (
    <div className=' text-white'>
      <div>
        <p></p>
        <p></p>
        <p></p>


        {/* section 1 */}
        <div>
          <p>Courses to get you started</p>
          <div>
            <p>Most popular</p>
            <p>New</p>
            <p>Trending</p>
          </div>
          <div>
            <CourseSlider/>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <div>Top courses in </div>
          <div>
            <CourseSlider/>
          </div>
        </div>

        {/* section 3 */}
        <div>
          <div>Frequently Bought Together</div>
          <div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Catalog