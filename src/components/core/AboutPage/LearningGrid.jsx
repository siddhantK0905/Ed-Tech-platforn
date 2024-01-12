import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import Button from '../HomePage/Button'

const LearningGridArray = [
    {
        order:-1,
        heading: "World-class Learning for",
        highlightText : "Anyone, AnyWhere",
        description : "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText:"Learn More",
        BtnLink:"/"
    },
    {
        order:1,
        heading: "Curriculum Based on Industry Needs",
        description : "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order:2,
        heading: "Our Learning Methods",
        description : "The learning process uses the namely online and offline.",
    },
    {
        order:3,
        heading: "Certification",
        description : "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order:4,
        heading: "Rating Auto-grading",
        description : "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    }, 
    {
        order:5,
        heading: "Ready to Work",
        description : "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
]


const LearningGrid = () => {
  return (
    <div className='grid mx-auto w-[350px] xl:w-fit grid-col-1 xl:grid-cols-4 mb-12'>
        {
            LearningGridArray.map( (card, index) => {
                return(
                    <div
                    key={index}
                    className={`
                        ${index == 0 && 'xl:col-span-2 xl:h-[294px] '}
                        ${
                            card.order % 2 == 1
                             ? " bg-richblack-700 h-[294px] " 
                            : card.order % 2 === 0 
                            ? "bg-richblack-800 h-[294px]"
                            :"bg-transparent"
                        }
                        ${
                            card.order == 3 && "xl:col-start-2 "
                        }
                        ${
                            card.order<0 && "bg-transparent"
                        }
                    `}
                    >
                    {
                        card.order < 0 ? 
                        (
                            <div className=' flex flex-col gap-3 xl:w-[90%] pb-10 xl:pb-0'> 
                                <div className='text-4xl font-semibold'>
                                    {card.heading}
                                    <HighlightText text={card.highlightText}/>
                                </div>
                                <p className=' font-medium text-richblack-300 '>
                                    {card.description}
                                </p>
                                <div className=' max-w-fit mt-2'>
                                    <Button active={true} linkto={card.BtnLink}>Learn More</Button>
                                </div>
                            </div>
                        ) 
                        : (
                            <div className='p-8 flex flex-col gap-8'>
                                <div className='text-lg text-richblack-5'>
                                    {card.heading}
                                </div>
                                <p className='text-richblack-300 font-medium'>
                                    {card.description}
                                </p>
                            </div>
                        )
                    }
                        
                    </div>
                )
            })
        }
        
    </div>
  )
}

export default LearningGrid