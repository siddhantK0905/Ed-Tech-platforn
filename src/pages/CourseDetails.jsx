import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentFeatureAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error"
import RatingStars from "../components/common/RatingStars"
import ConfirmationModal from "../components/core/Dashboard/ConformationModal"
import { formatDate } from '../services/formatDate';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { CourseAccordionBar } from '../components/core/Course/CourseAccordionBar';


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
  const [isActive, setIsActive] = useState(Array(0));


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


    const handleActive = (id) => {
      setIsActive(
        !isActive.includes(id) ? isActive.concat([id])
        : isActive.filter((e) => e != id)
      )
    }
  
  return (
    <>
    <div className=' w-full bg-richblack-800'>

      <div className='mx-auto min-h-[450px] box-content lg:w-[1260px] 2xl:relative'>
      <div className=' mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>

        <div className=' relative block max-h-[30rem] lg:hidden'>

          <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>

              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
        </div>

        <div className=' my-5 flex flex-col gap-4 w-6/12 mx-auto py-5 text-lg text-richblack-5 justify-center z-30'>
          
          <p className=' text-4xl font-bold text-richblack-5 sm:text-[42px] '>{courseName}</p>
          <p className=' text-richblack-200'>{courseDescription}</p>

          <div className='flex flex-row flex-wrap gap-x-2 text-md text-richblack-5'>
            <span className=' text-yellow-25'>{avgReviewCount}</span>
            <span> <RatingStars Review_Count={avgReviewCount} Star_size={24}/></span>
            <span>{`(${ratingAndReviws.length} reviews)`}</span>
            <span> {studentEnrolled.length} students enrolled</span>
          </div>

          <p className=' text-md '> Created By {instructor.firstName} {instructor.lastName}</p>

          {/* for date and time */}
          <div className='flex flex-wrap gap-5 text-lg'>
              <p className=' flex items-center gap-2'>
              {" "}
                <BiInfoCircle/> Created at {formatDate(createdAt)}
              </p>
              <p className=' flex items-center gap-2 '> 
                {" "}
                <HiOutlineGlobeAlt/> English</p>
          </div>

        </div>

        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
        
      </div>
        


        {/* right Section */}
        <div className=" min-h-[600px] max-w-[410px] right-[1rem] top-[60px] hidden  w-1/3 -translate-x-20 translate-y-24 md:traslate-y-0 lg:absolute lg:block ">
          <CourseDetailsCard
            course = {courseData?.data?.courseDetails}
            handleBuyCourse = {handleBuyCourse}
            setConfirmationModal = {setConfirmationModal}
          />
        </div>


      </div>

    </div>


    <div className='mx-auto max-content text-richblack-5 lg:w-[960px] text-start px-4'>
      <div className=' mx-auto max-w-maxContentTab lg:mx-0 lg:w-[850px]'>

      <div className ="my-8 border border-richblack-600 p-8">
          <p className=' font-semibold text-3xl'>What You'll learn</p>
          <div className=' mt-5'>
              {whatYouWillLearn} 
          </div>
          </div>


          {/* Course Content Section */}

          <div className=' max-w-[830px]'> 
            <div className=' flex flex-col gap-3 mb-4'> 
               <p className=' text-[28px] font-semibold'> Course Content :</p>

              <div className='flex flex-wrap gap-2 justify-between'>

                <div className='flex gap-2'>
                  <span>{courseContent.length} section(s)</span>
                  <span>{totalLectures} lecture(s)</span>
                  <span>{courseData?.data?.totalDuration >0  ? courseData?.data?.totalDuration: 0 } total length</span>
                </div>

                <div>
                    <button
                    className='text-yellow-25'
                    onClick={() => setIsActive([])}>
                      Collapse all sections
                    </button>
                </div>
              </div>
            </div>


            {/* Course Details Accordion */}
            <div className=' py-4 '>
              {
                courseContent.map((course, index) => (
                  <CourseAccordionBar
                    course= {course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))
              }
            </div>

              {/* Author Details */}
            <div className=' mb-12 py-4'>
              <p className=' text-[28px] font-semibold'> Author</p>
              <div className='flex items-center gap-4 py-4'>
                <img
                  src={
                    instructor.image ? instructor?.image :
                    `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt='Author'
                  className='h-14 w-14 rounded-full object-cover'
                />

                <p className=' text-lg'>{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>

              <p className=' text-richblack-50'>
                {instructor?.additionalDetails?.about ? instructor?.additionalDetails?.about : " "}
              </p>
            </div>  
          </div>
      </div>
    </div>    


      {/* <button className=' bg-yellow-100 mt-4 p-2'
      onClick={()=>handleBuyCourse()}>
        Buy Now
      </button> */}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
      
    </>
  )
}

export default CourseDetails