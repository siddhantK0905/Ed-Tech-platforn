import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Course_Card = ({course,Height}) => {
    useEffect(()=>{
        console.log("Course from COURSE_CARD", course);
    },[])
  return (
    <div className=' text-white'>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className=' rounded-lg'>
                    <img src={course.thumbnail} 
                         alt='courseTumbnail'
                        className={`${Height} w-full rounded-xl, object-cover`}
                    />
                </div>

                <div className='flex flex-col gap-2 px-1 py-3'>
                    <p className='text-xl text-richblack-5'>{course?.courseName}</p>
                    <p className=' text-sm text-richblack-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>

                    <div className='flex gap-2 items-center'>
                        <span className=' text-yellow-5'>{0}</span>
                        <div></div>
                        <p></p>
                    </div>

                    <p className=' text-xl text-richblack-5'>{course.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card