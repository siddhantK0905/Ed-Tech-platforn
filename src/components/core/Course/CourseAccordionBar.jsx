import React, { useEffect, useRef, useState } from 'react'
import{AiOutlineDown} from 'react-icons/ai'
import { CourseSubSectionAccordian } from './CourseSubSectionAccordian';

export const CourseAccordionBar = ({course, isActive, handleActive}) => {
    
    const contentE1 = useRef(null)

    const [active, setActive] = useState(false);

    useEffect(()=>{
        
        setActive(isActive?.includes(course._id))

    },[isActive])

    const [sectionHeight, setSecHeight] = useState(0);

    useEffect(()=>{

        setSecHeight(active ? contentE1.current.scrollHeight : 0)

    },[active])

    return (
    <div className=' overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0'>
        <div>
            <div className='flex justify-between items-center cursor-pointer bg-opacity-20 px-7 py-6 transition-[0.3s]'
            onClick={()=>{
                handleActive(course._id)
            }}
            >
                <div className='flex items-center gap-2'>
                    <i
                      className={
                        isActive.includes(course._id) ? 'rotate-180' :'rotate-0'
                      }
                    >
                        <AiOutlineDown/>
                    </i>
                    <p>
                        {course?.sectionName}
                    </p>
                </div>
                <div className=' space-x-4'>
                    <span className=' text-yellow-25'>{course.subSection.length || 0} lecture(s) </span>
                </div>
            </div>
        </div>

        <div
        ref={contentE1}
        className={`relative h-0 overflow-hidden bg-richblack-900 transition-[Height] duration-[0.35s] ease-[ease]`}
        style={{
            height: sectionHeight
        }}
        >
            <div className=' text-textHead flex flex-col gap-2 px-7 py-6 font-semibold'>
                {
                    course?.subSection?.map((subsec, i) => {
                        return <CourseSubSectionAccordian subSec = {subsec} key={i}/>
                    })
                }
            </div>
        </div>

    </div>
  )
}
