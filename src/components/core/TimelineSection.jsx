import React from 'react'

import logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo:logo1,
        heading:"Leardership",
        description:"Fully committed to the success company"
    },
    {
        logo:logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        logo:logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    }
]


const TimelineSection = () => {
  return (
    <div className='flex flex-row gap-15 items-center '>
        {/* left part */}
        <div className='flex flex-col gap-5 w-[45%]'>
            {
               timeline.map( (element, index) =>{
                    return (
                        <div className='flex flex-row gap-6' key={index}>
                            <div className=' h-[50%] bg-white flex items-center'>
                                <img src={element.logo}></img> 
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold text-[18px]'>{element.heading}</p>
                                <p className='text-base'>{element.description}</p>
                            </div>
                        </div>
                    )
               } ) 
            }
        </div>

        {/* RightPart */}
        <div className='relative shadow-blue-200'>

            <img src={timelineImage}
                alt='timelineImage'
                className='shadow-white object-cover h-fit'
            />

            <div className='absolute bg-caribbeangreen-700 flex flex-row uppercase text-white py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]'  >
                <div className='flex flex-row gap-5 items-center px-7 border-r border-caribbeangreen-300 '>
                        <p className='text-3xl font-bold'>10</p>
                        <p className=' text-caribbeangreen-300 text-sm '>years experience</p>
                </div>

                <div className='flex flex-row gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className=' text-caribbeangreen-300 text-sm '>types of courses</p>
                </div>
            </div>


            
        </div>

    </div>
  )
}

export default TimelineSection