import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import {GiNinjaStar} from "react-icons/gi"
import{RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice'

const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);

    const dispatch = useDispatch();

  return (
    <div>
        {
            cart.map( (course, index) => (
                <div key={index}>
                   <div>
                        <img
                            src={course?.tumbnails}
                        />
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.categoery?.name}</p>
                            <div>
                                <span>4.5</span>
                                <ReactStars
                                    count ={5}
                                    size ={24}
                                    edit = {false}
                                    activeColor = "#ffd700"
                                    emptyIcon = {<GiNinjaStar/>}
                                    fullIcon = {<GiNinjaStar/>}
                                />

                                <span>{course?.ratingAndReviews?.length} Rating</span>
                            </div>
                        </div>
                   </div>
                   <div>
                        <button
                            onClick={() => dispatch(removeFromCart(course.id))}
                        >
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                        </button>
                        
                        <p>Rs. {course?.price}</p>

                   </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses