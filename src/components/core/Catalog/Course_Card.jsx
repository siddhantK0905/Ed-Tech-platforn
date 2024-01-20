import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Course_Card = ({course,Height}) => {
  return (
    <div className=' text-white'>
        <Link>
            <div>
                <div>
                    <img src={course.thumbnail} 
                        className={`${Height} w-full rounded-xl, object-cover`}
                    />
                </div>

                <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>

                    <div className='flex gap-x-3'>
                        <span>{0}</span>
                        <div></div>
                        <p></p>
                    </div>

                    <p>{course.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card