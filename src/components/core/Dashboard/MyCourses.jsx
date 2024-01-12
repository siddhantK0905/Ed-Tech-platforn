import React, { useEffect, useState } from 'react'
import IconBtn from '../../common/IconBtn'
import BsPlusLg from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CourseTable from './InstructorCourses/CourseTable';
import { fetchInstructorCourseDetails } from '../../../services/operations/courseDetailsAPI';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const{token} = useSelector((state)=>state.auth)

    const fetchCourses = async ()=>{
        setLoading(true)
        const allCourses = await fetchInstructorCourseDetails(token)
        if(allCourses){
            setCourses(allCourses)
        }
    }

    useEffect( ()=>{
        fetchCourses();
    },[])


  return (
    <div>
        <div className='flex justify-between'>
            <h1>My Courses</h1>
            <IconBtn
             text="Add Courses"
             onClick={()=>navigate("/dashboard/add-courses")}
            >
            </IconBtn>

        </div>
        <div>
            {courses && <CourseTable courses={courses} setCourses={setCourses}/> }
        </div>
    </div>
  )
}

export default MyCourses