import React from 'react'
import { buyCourse } from '../services/operations/studentFeatureAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
const CourseDetails = () => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId} = useParams();

  const handleBuyCourse = () =>{
    console.log("Courses ", courseId)
    console.log("TOken while buying course", token);
    if(token){
      buyCourse(token, [courseId], user, navigate, dispatch);
    }
  }

  return (
    <div className=' text-richblack-800'>
      <button className=' bg-yellow-100 mt-4 p-2'
      onClick={()=>handleBuyCourse()}>
        Buy Now
      </button>
    </div>
  )
}

export default CourseDetails