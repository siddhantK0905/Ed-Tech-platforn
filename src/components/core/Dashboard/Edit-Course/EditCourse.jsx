import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RenderSteps from "../AddCourse/RenderSteps"
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse,setEditCourse } from '../../../../slices/courseSlice';


const EditCourse = () => {
    const [loading, setLoading] = useState(false);
    const courseID = useParams();
    const courseId = courseID.courseId
    console.log("Value of courseId is", courseId)

    const {token} = useSelector((state) => state.auth);
    const {editCourse,course} = useSelector((state)=> state.course);

    const dispatch = useDispatch();

    const fetchFullDetails = async ()=>{

        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId,token);
        console.log("Response from fullCourseDetails", result)

        if(result?.courseDetails){
            dispatch(setCourse(result?.courseDetails));
            dispatch(setEditCourse(true));
        }

        setLoading(false);
    }

    useEffect( () => {
        console.log("Course Id in EditCourse",courseId)
        fetchFullDetails();
    },[])

  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
        <div className="mx-auto max-w-[600px]">
        {
            course ? (
                <div>
                    <RenderSteps></RenderSteps>
                </div>
            ) :
             (<p  className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                Course not Found
             </p>)
        }
        </div>

    </div>
  )
}

export default EditCourse