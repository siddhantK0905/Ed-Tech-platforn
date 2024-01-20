import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules'

import Course_Card from './Course_Card'


const CourseSlider = ({Courses}) => {
  useEffect(()=>{
    console.log("Courses in CourseSlider", Courses);
    setAllCourses(Courses)
  },[Courses])

  const[allCourses, setAllCourses] = useState([]);
  return (
    <>
          {
            Courses ? (
              <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={200}
                    pagination={{
                    dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>

            ) :(<p></p>)
          }
            

          <p>No Course Found</p>

    
    

      <p>{"HIII"}</p>
    </>
  )
}

export default CourseSlider