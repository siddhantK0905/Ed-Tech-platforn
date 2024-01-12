import React from 'react'
import HighlightText from './HighlightText'
import CTAbutton from "../HomePage/Button"
import Insturctor from "../../../assets/Images/Instructor.png"
import {FaArrowRight} from 'react-icons/fa'


const InstructorSection = () => {
  return (
    <div className='flex flex-row items-center justify-center gap-20 mt-16'>
        {/* left part */}
        <div className='w-[50%]'>
            <img
                alt='Instructor'
                src={Insturctor}
                className=' shadow-white'
            />
        </div>

        {/* Right Part */}
        <div className=' w-[50%] flex flex-col gap-10'>
            <p className='text-4xl font-semibold w-[50%]'>
            Become an 
            <HighlightText text={"instructor"}/>
            </p>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300 '>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.  
            </p>

            <div className='w-fit'>
                <CTAbutton active={true} >           
                <div className='flex flex-row items-center justify-center gap-5 '>
                    Start Learning Today 
                <FaArrowRight/>
                </div>
                </CTAbutton>
            </div>

        </div>
    </div>
  )
}

export default InstructorSection