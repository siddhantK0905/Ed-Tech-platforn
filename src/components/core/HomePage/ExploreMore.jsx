import React, { useState } from 'react'
import HighlightText from './HighlightText'
import {HomePageExplore} from "../../../data/homepage-explore"
import CourseCard from './CourseCard'

const tabsName = [
    "Free", "New to coding", "Most popular", "Skills paths", "Career paths"
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses)
    }

  return (
    <div className='flex flex-col items-center '>
        <div className='text-4xl font-bold text-center'>
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>

        <p className='text-[16px] text-center text-richblack-300 mt-3'>
        Learn to Build Anything You Can Imagine
        </p>

        {/* for Tabs */}
        <div className='flex flex-row gap-2 mt-5 rounded-full bg-richblack-800 mb-5 border-richblack-100 '>
            {
                tabsName.map( ( element, index) => {
                    return (
                        <div className={`text-[16px] flex items-center gap-2 flex-row
                        ${currentTab === element
                         ?" bg-richblack-900 text-richblack-5 font-medium " 
                        : " text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                        hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                        key={index}
                        onClick={() => setMyCards(element)}>

                            {element}
                        </div>
                    )
                })
            }

        </div>

        <div className='flex flex-row gap-14 items-center justify-center mt-8 w-fit'>
            {
                courses.map( (element,index) => {
                    return (
                        <CourseCard
                         CardData ={element}
                         key={index}
                         />
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore