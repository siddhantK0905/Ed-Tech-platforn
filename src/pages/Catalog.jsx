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
  const [active, setActive] = useState(1);

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

    {/* Hero Section */}
      <div className=' bg-richblack-800 px-4 box-content'>
        <div className='mx-auto flex min-h-[260px] flex-col justify-center gap-4 lg:max-w-maxContent max-w-maxContentTab'>
          <p className=' text-richblack-300 text-sm'>Home / Catelog / <span className=' text-yellow-50'> {` ${categoryPageData?.Data?.selectedCourses?.name}`}</span></p>
          <p className=' text-3xl'>{categoryPageData?.Data?.selectedCourses?.name}</p>
          <p className=' text-richblack-200 text-w-[870px]'>{categoryPageData?.Data?.selectedCourses?.description}</p>
        </div>

      </div>

        {/* section 1 */}
        <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
          <p className=' text-3xl '>Courses to get you started</p>
          <div className='flex  my-4 border-b border-b-richblack-600 text-sm gap-x-4'>
            <p className={`py-2 ${
              active === 1 ? 'border-b border-yellow-25 text-yellow-25':' text-richblack-50'
            }`}
            onClick={()=>{setActive(1)}}
            >
            Most popular</p>

            <p className={`py-2 ${
              active === 2 ? 'border-b border-yellow-25 text-yellow-25':' text-richblack-50'
            }`}
            onClick={()=>{setActive(2)}}
            >New</p>

            <p className={`py-2 ${
              active === 3 ? 'border-b border-yellow-25 text-yellow-25': ' text-richblack-50'
            }`}
            onClick={()=>setActive(3)}
            >Trending</p>
          </div>

          <div>
            <CourseSlider Courses={categoryPageData?.Data?.selectedCourses?.courses}/>
          </div>
        </div>

        {/* Section 2 */}
        <div className='mx-auto max-w-maxContentTab lg:max-w-maxContent box-content w-full px-4 py-12'>
          <div className='text-3xl'>Top courses in {categoryPageData?.Data?.selectedCourses?.name}</div>
          <div>
            {
              (categoryPageData?.Data?.differentCategory?.courses ? (
                <CourseSlider Courses={categoryPageData?.Data?.differentCategory?.courses}/>
              ):(<p>NO Course</p>))
            }
            
          </div>
        </div>

        {/* section 3 */}
        <div className='mx-auto max-w-maxContentTab lg:max-w-maxContent box-content w-full px-4 py-12'>
          <div className='text-3xl'>Frequently Bought Together</div>
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            {
              categoryPageData?.Data?.mostSellingCourses?.slice(0,4)
              .map((course, index)=> (
                <Course_Card course={course} Height={"h-[400px]"} key={index} />
              ))
            }
          </div>
        </div>

      
    </div>
  )
}

export default Catalog