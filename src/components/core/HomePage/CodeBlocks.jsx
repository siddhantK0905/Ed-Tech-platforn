import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import CTAbutton from "../HomePage/Button"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({position, heading, subHeading, ctabtn1, ctabtn2, codeblock ,backgroundGradient, codeColor}) => {
  return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>

            {/* leftSide */}
            <div className= "w-[50%] flex flex-col gap-8">
                {heading}

                <div className=' font-bold text-richblack-300'>
                    {subHeading}
                </div>

                <div className='flex gap-7 mt-7'>
                    <CTAbutton
                        active={ctabtn1.active} linkto={ctabtn1.linkto}
                    >
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.text}
                            <FaArrowRight/>
                        </div>

                    </CTAbutton>
                    
                    <CTAbutton
                      active={ctabtn2.active} linkto={ctabtn1.linkto}
                    >
                        {ctabtn2.text}
                    </CTAbutton>
                </div>

            </div>


            {/* RightSide */}
            <div className='flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px]'>

                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>

                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-mono font-bold ${codeColor} pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock,2000,""]}
                        repeat={Infinity}
                        cursor={true}

                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block",
                            }
                        }

                        omitDeletionAnimation={true}

                    />
                </div>

            </div>


        </div>
  )
}

export default CodeBlocks