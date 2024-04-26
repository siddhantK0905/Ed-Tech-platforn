import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"
import {buyCourse} from "../../../../services/operations/studentFeatureAPI"
import { useNavigate } from 'react-router-dom'

const RenderTotalAmount = () => {

    const {total,cart} = useSelector( (state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector( (state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () =>{
        const courses = cart.map ((course) => course._id);
        buyCourse(token, courses, user, navigate, dispatch)
        console.log("Bought course: ",courses);
    }
  return (
    <div>
        <p>Total :</p>
        <p>Rs. {total}</p>

        <IconBtn
            text = "Buy Now"
            onClick={handleBuyCourse}
            customClasses = {"w-full justify-center"}
        />

    </div>
  )
}

export default RenderTotalAmount