import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";



function CourseDetailsCard  ( {course, handleBuyCourse, setConfirmationModal}) {
    
    const user = useSelector((state)=> state.profile);
    const token = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,

    } = course

    const addToCartHandler = () => {

        if(user && user?.account_type === ACCOUNT_TYPE.INSTRUCTOR ){
            toast.error("You are Instructor , You Can't add the course");
            return;
        }

        if(token){
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Kindly logged in ",
            btn1Text:"Login",
            btn2Text:'Cancel',
            btn1Handler:()=> navigate("/login"),
            btn2Handler:() => setConfirmationModal(null)
        })
    }

    const handleShare = () => {

        copy(window.location.href);
        toast.success("Link copied");

    }

    return (
    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 '>
        <img
            src={thumbnail}
            alt='Thumbnail of course'
            className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <p className=' font-semibold text-3xl '> Rs. {price}</p>

        <div className='flex flex-col gap-4'>
           
            <button className=" yellowButton"
                onClick={(user && course.studentEnrolled.includes(user._id)) ? navigate("/dashboard/enrolled-courses") : 
                handleBuyCourse}>

                {
                    (user && course?.studentEnrolled.includes(user._id))? "Go to course" : "Buy Now " 
                }
            </button>

                {
                    (!course?.studentEnrolled.includes(user._id)) && 
                    <button
                    className=' blackButton'
                    onClick={addToCartHandler}>
                        Add to cart
                    </button>
                }


        </div>

        <p className=' text-richblack-25 text-center pt-2 text-sm'> 30-Day Money-Back Guarantee</p>

        <div>
            <p className=' text-xl font-bold my-2'>This course includes :</p>
            
            <div className=' text-caribbeangreen-50 text-sm'>
                {
                    course?.instructions.map((item,index) => (
                        <div key={index} className='flex gap-2'>
                            <BsFillCaretRightFill />
                            <p>{item}</p>
                        </div>
                    ))
                }
            </div>
        </div>

        <div>
            <button 
                onClick={handleShare}
                className=' text-yellow-200 flex flex-row gap-2 items-center mx-auto'>
                   <FaShareSquare /> Share
            </button>
        </div>

    </div>
  )
}

export default CourseDetailsCard