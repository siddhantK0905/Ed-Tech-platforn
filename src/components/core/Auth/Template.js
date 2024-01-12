import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

import frame from "../../../assets/Images/frame.png"

const Template = ({title , description1, description2, formType, img}) => {
  return (
    <div className='mt-10  '>
        
        <div className='flex flex-row justify-center items-center w-11/12 mx-auto max-w-maxContent gap-10 gap-y-20 py-12'>

            <div className=' max-w-[450px] mx-auto'>
                <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                    {title}
                </h1>
                <p className='mt-4 text-[1.125rem] leading-[1.625rem]  '> 
                    <span className=' text-richblack-100'>
                        {description1}
                    </span>
                    
                    <span className=' font-edu-sa font-bold italic text-blue-100 '>
                        {description2}
                    </span>
                </p>
                

                {formType ==="login" ? (<LoginForm/>) : (<SignupForm/>) }

            </div>

            {/* Right part */}
            <div className='relative max-w-[450px] mx-auto mt-10'>
                <img
                    alt='Frame'
                    src={frame}
                    width={558}
                    height={504}
                    loading='lazy'
                />
                <img
                    alt='student'
                    src={img}
                    height={504}
                    width={558}
                    loading='lazy'
                    className='absolute -top-4 right-4 z-10'
                />
            </div>

        </div>


    </div>
  )
}

export default Template