import React, { useEffect, useState } from 'react'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { useParams } from 'react-router-dom';
import { categories } from '../services/apis';
import {apiConnector} from "../services/apiConnector"
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';

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
        <p>Home / Catlog / <span> {` ${catalogName}`}</span></p>
        <p>{catalogName}</p>
        <p>{categoryPageData?.Data?.selectedCourses?.description}</p>


        {/* section 1 */}
        <div>
          <p>Courses to get you started</p>
          <div className='flex gap-x-3'>
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
          <div>Top courses in {categoryPageData?.Data?.selectedCourses?.name}</div>
          <div>
            <CourseSlider/>
          </div>
        </div>

        {/* section 3 */}
        <div>
          <div>Frequently Bought Together</div>
          <div>
            {
              categoryPageData?.Data?.mostSellingCourses?.slice(0,4)
              .map((course, index)=> (
                <Course_Card course={course} key={index} />
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Catalog