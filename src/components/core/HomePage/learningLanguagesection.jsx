import React from 'react'
import HighlightText from './HighlightText'

import know_your_progress from  "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from "../HomePage/Button"

const learningLanguagesection = () => {
  return (
    <div className='flex flex-col gap-15 mt-[110px] items-center justify-center gap-5 mb-32'>
        
        {/* Heading */}
        <div className='text-4xl font-semibold text-center'>
        Your swiss knief for <HighlightText text={"learning any language"}/></div>

        {/* subHeading */}
        <div className=' text-center text-richblack-600 mx-auto text-base font-medium w-[60%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        {/* for images */}
        <div className='flex flex-row items-center mt-5'>
            <img
                src={know_your_progress}
                alt='know_your_progress'
                className=' object-contain ml-20 -mr-28'
             />
             <img
                src={compare_with_others}
                alt='compare_with_others'
                className=' object-contain -mr-32'
             />
             <img
                src={plan_your_lessons}
                alt='plan_your_lessons'
                className=' object-contain'
             />

        </div>

        {/* button */}
        <div>
            <CTAbutton active={true}>
                Learn more
            </CTAbutton>
        </div>

    </div>
  )
}

export default learningLanguagesection