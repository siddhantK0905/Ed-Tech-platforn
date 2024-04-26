import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentFeatureAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error"
import RatingStars from "../components/common/RatingStars"
import ConfirmationModal from "../components/core/Dashboard/ConformationModal"
import { formatDate } from '../services/formatDate';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';

const CourseDetails = () => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state)=>state.auth);
  const {loading} = useSelector((state) => state.profile);
  const {paymentLoading} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId} = useParams();

  const[courseData, setCourseData] = useState(null);
  const[confirmationModal, setConfirmationModal] = useState(null);

  useEffect(()=>{
    const fetchCourseDetails = async() =>{
      try{
        const res = await getFullDetailsOfCourse(courseId, token);
        console.log("Response from fetchCourseDetails", res);
        setCourseData(res);
      }
      catch(err){
        console.log("Could not fetch course details");
      }
    }

    fetchCourseDetails();
  },[courseId])

 
  const[avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(()=>{
    const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviws);
    setAvgReviewCount(count)
  },[courseData]);


  const [totalLectures, setTotalLectures] = useState(0);

  useEffect(()=> {

    let lectures = 0;

    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      // lectures += sec.subSection.length || 0;
    })

    console.log("Total lec are ", lectures);
    setTotalLectures(lectures);
  },[courseData])


 //To update
  const handleBuyCourse = () =>{
    console.log("Courses ", courseId)
    console.log("TOken while buying course", token);
    if(token){
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    
    setConfirmationModal({
      text1:"You are not logged in",
      text2:"Please login to purchase a course",
      btn1Text:"Login",
      btn2Text:"Cancel",
      btn1Handler:()=> navigate("/login"),
      btn2Handler:()=>setConfirmationModal(null)
    })
  }


  if(loading || !courseData){
    return(
      <div>
        loading.....
      </div>
    )
  }

  if(!courseData?.success){
    return(
      <Error/>
    )
  }

  const {
    _id:course_id,
    courseName,
    courseContent,
    courseDescription,
    instructions,
    instructor,
    price,
    ratingAndReviws,
    status,
    studentEnrolled,
    tag,
    thumbnail,
    createdAt,
    whatYouWillLearn


  } = courseData?.data?.courseDetails




  return (
    <div className=' text-richblack-800 text-white'>

      {/* left Section */}
      <div className='flex flex-col relative'>
        <p>{courseName}</p>
        <p>{courseDescription}</p>

        <div className='flex flex-row gap-x-3'>
          <span>{avgReviewCount}</span>
          <span> <RatingStars Review_Count={avgReviewCount} Star_size={24}/></span>
          <span>{`(${ratingAndReviws.length} reviews)`}</span>
          <span> {studentEnrolled.length} students enrolled</span>
        </div>

        <p> Created By {instructor.firstName} {instructor.lastName}</p>

        {/* for date and time */}
        <div className='flex gap-x-3'>
            <p>
              Created at {formatDate(createdAt)}
            </p>
            <p> English</p>
        </div>


      </div>

      {/* right Section */}
      <div>

        <CourseDetailsCard
          course = {courseData?.data?.courseDetails}
          handleBuyCourse = {handleBuyCourse}
          setConfirmationModal = {setConfirmationModal}
        />
      </div>



      {/* <button className=' bg-yellow-100 mt-4 p-2'
      onClick={()=>handleBuyCourse()}>
        Buy Now
      </button> */}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails