import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAbutton from "../components/core/HomePage/Button"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import Banner from "../assets/Images/banner.mp4"
import TimelineSection from '../components/core/TimelineSection'
import LearningLanguageSection from "../components/core/HomePage/learningLanguagesection"
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
            <div className='relative flex flex-col mx-auto w-11/12 max-w-maxContent items-center 
            text-white justify-between'>
            
                {/* Top Button */}
                <Link to = {"SignUp"}>

                    <div className=' group: mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                    transition-all duration-200 hover:scale-95 w-fit'>
                        <div className=' flex flex-row gap-2 items-center px-10 py-[5px] 
                        transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                <div className='text-4xl font-semibold mt-7 text-center'>
                    Empower Your Future with
                    <HighlightText text ="Coding Skills"/>    
                </div>

                {/* SubHeading */}
                <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 '>
                With our online coding courses, you can learn at your own pace, from anywhere
                in the world, and get access to a wealth of resources, including hands-on
                 projects, quizzes, and personalized feedback from instructors. 
                </div>

                {/* 2 Buttons */}
                <div className='flex gap-7 mt-8'>
                    <CTAbutton active={true} linkto={"/signup "} >
                        Learn More
                    </CTAbutton>
                    <CTAbutton active={false} linkto={"/login"}>
                        Back a demo
                    </CTAbutton>
                </div>

                {/* video adding */}
                <div className='mx-3 my-12 shadow-blue-200'>
                    <video
                    muted
                    loop
                    autoPlay
                    >
                    <source src={Banner} type='video/mp4'/>
                    </video>
                </div>

                {/* code Section 1 */}
                <div>
                    <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text={"coding potential "} />
                            with our online courses
                        </div>
                    }
                    subHeading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                    
                    ctabtn1={
                        {
                            text : "try it Yourself",
                            active: true,
                            linkto:"/signup"
                        }
                    }  

                    ctabtn2={
                        {
                            text:"Learn More",
                            active: false,
                            linkto:"/login"
                        }
                    }  

                    codeblock={`<!DOCTYPE html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n <body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}

                    codeColor={"text-yellow-25"}
                    >
                    </CodeBlocks>

                </div>

                {/* code Section 2 */}
                <div>
                    <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={"coding "} /><br/>
                            <HighlightText text={"in Seconds "} />
                        </div>
                    }
                    subHeading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    
                    ctabtn1={
                        {
                            text : "Continue Lesson",
                            active:true,
                            linkto:"/signup"
                        }
                    }  

                    ctabtn2={
                        {
                            text:"Learn More",
                            active:false,
                            linkto:"/login"
                        }
                    }  

                    codeblock={`<!DOCTYPE html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n <body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}

                    codeColor={"text-yellow-25"}
                    >
                    </CodeBlocks>

                </div>
            
                {/* Explore more Section */}
                <ExploreMore/>
            </div>

        {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>

                {/* Image */}
                <div className='homepage_bg h-[310px]'>
                    
                    <div className='flex flex-col w-11/12 max-w-maxContent items-center mx-auto justify-between gap-5'>
                        
                        <div className='h-[150px]'></div>
                        {/* for buttons */}
                       <div className='flex flex-row gap-7'>
                            <CTAbutton active={true} linkto={"/signup"}>
                                <div className='flex flex-row items-center gap-2'>
                                    Explore Full Catelog
                                    <FaArrowRight/>
                                </div>
                            </CTAbutton>
                            <CTAbutton active={false} linkto={"/signup"}>
                                Learn More
                            </CTAbutton>
                        </div>
                    </div>

                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-7'>

                    <div className='flex flex-row gap-5 mb-10 mt-[95px] '>
                       {/* left part */}
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the Skills you need for a <HighlightText text={"job that is in demand "}/>
                        </div>

                        {/* right part */}
                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAbutton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAbutton>
                        </div>
                    </div>
                    
                   <TimelineSection/> 
                   <LearningLanguageSection/>
                </div>
            </div>


        {/* Section 3 */}
            <div className='flex flex-col w-11/12 mx-auto max-w-maxContent items-center justify-center text-white'>

               <InstructorSection/>

            </div>

    
       {/* Footer */}



    </div>
  )
}

export default Home