import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';



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
    <div>
        <img
            src={thumbnail}
            alt='Thumbnail of course'
            className=' max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
        />

        <p> Rs. {price}</p>

        <div className='flex flex-col gap-x-3'>
           
            <button className=' bg-yellow-100 mt-4 p-2 w-fit'
                onClick={(user && course.studentEnrolled.includes(user._id)) ? navigate("/dashboard/enrolled-courses") : 
                handleBuyCourse}>

                {
                    (user && course?.studentEnrolled.includes(user._id))? "Go to course" : "Buy Now " 
                }
            </button>

                {
                    (!course?.studentEnrolled.includes(user._id)) && 
                    <button
                    className=' w-fit'
                    onClick={addToCartHandler}>
                        Add to cart
                    </button>
                }


        </div>

        <p> 30-Day Money-Back Guarantee</p>

        <div>
            <p>This course includes :</p>
            
            {
                course?.instructions.map((item,index) => (
                    <div key={index} className='flex gap-2'>
                        <p>{item}</p>
                    </div>
                ))
            }
        </div>

        <div>
            <button 
                onClick={handleShare}
                className=' text-yellow-200'>
                    Share
            </button>
        </div>

        
        <div>

            <p>What You'll learn</p>
            <div>
                {whatYouWillLearn}
            </div>
        </div>


        <div>
            <div> 
                Course Content :
            </div>
            <div>
                <span>{courseContent.length} section(s)</span>
                <span></span>
                {/* <span>{?.data?.totalDurationInSeconds} duration(s) </span> */}
            </div>
        </div>



    </div>
  )
}

export default CourseDetailsCard