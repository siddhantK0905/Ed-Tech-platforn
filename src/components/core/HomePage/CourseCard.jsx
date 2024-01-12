import React from 'react'

const CourseCard = ({CardData}) => {
  return (
    <div className=' group flex flex-col gap-6 bg-richblack-800 -mb-24 h-full w-[25%]
     hover:bg-white text-black  transition-all duration-200'>

        <div className='text-xl font-semibold text-richblack-5 mt-5 ml-5'>
            {CardData.heading}
        </div>
        <p className=' text-[16px] text-richblack-300 ml-5 w-[90%] '>
            {CardData.description}
        </p>

        <div className='flex flex-row ml-5 justify-between mt-16'>
            <div className='text-[16px] text-richblack-300'>
                <img/>
                {CardData.level}
            </div>

            <div className='mr-5 mb-5 text-[16px] text-richblack-300'>
                <img/>
                {
                   `${ CardData.lessionNumber} Lessons`
                }
            </div>
        </div>

    </div>
  )
}

export default CourseCard