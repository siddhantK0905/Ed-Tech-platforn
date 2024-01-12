import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import banner1 from "../assets/Images/aboutus1.webp"
import banner2 from "../assets/Images/aboutus2.webp"
import banner3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import foundingStory from "../assets/Images/FoundingStory.png"
import StatsComponents from '../components/core/AboutPage/StatsComponents'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'


const AboutPage = () => {
  return (
    <div>
        {/* Section 1  */}
        <section className=' bg-richblack-700'>
            <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white '>
                <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'
                >Driving Innovation in Online Education for a <HighlightText text="Brighter Future"/>

                <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>
                Studynotion is at the forefront of driving innovation in online education. 
                We're passionate about creating a brighter future by offering cutting-edge courses,
                leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
                </header>

                <div className='sm:h-[70px] lg:h-[150px]'></div>
                <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                    <img src={banner1}></img>
                    <img src={banner2}></img>
                    <img src={banner3}></img>
                </div>
            </div>

        </section>

        {/* Section 2 */}
        <section className=' border-b border-richblack-700'>
            <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
            <div className='h-[100px]'></div>
            <Quote/>
            </div>
        </section>

        {/* Section 3 */}
        <section>
            <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
                {/* Upper part  */}
                <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
                    {/* leftpart */}
                    <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
                        <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>
                        Our Founding Story </h1>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                         Our e-learning platform was born out of a shared vision and passion for transforming education.
                         It all began with a group of educators, technologists, and lifelong learners who recognized the
                         need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                         As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional
                         education systems. We believed that education should not be confined to the walls of a classroom or restricted
                         by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from
                         all walks of life to unlock their full potential.
                        </p>
                    </div>
                    {/* Right Part */}
                    <div>
                        <img src={foundingStory}
                            className='shadow-[0_0_20px_0] shadow-[#FC6767]'
                        />
                    </div>
                </div>

                {/* Our Vision & Mission */}
                <div className='flex gap-x-5'>
                    {/* OurVision  */}
                    <div>
                        <h1>Our Vision</h1>
                        <p>
                         With this vision in mind, we set out on a journey to create an e-learning platform that would 
                         revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust
                         and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and 
                         interactive learning experience.
                         </p>
                    </div>
                    {/* Our Mission */}
                    <div>
                        <h1>Our Mission</h1>
                        <p>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners,
                         where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in
                         an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, 
                         and networking opportunities.
                        </p>
                    </div>
                </div>

            </div>

        </section>

        {/* Section 4 */}
        <section>
            <StatsComponents/>
        </section>

        {/* Section 5 */}
        <section className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white'>
            <LearningGrid/>
            <ContactFormSection/>

        </section>

        {/* Section 6 */}
        <section>
        </section>


    </div>
  )
}

export default AboutPage