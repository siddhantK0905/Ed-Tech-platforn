import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { setStep , resetCourseState} from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useEffect } from 'react';


const PublishCourseForm = () => {

    const[loading, setLoading] = useState(false);
    const {course} = useSelector( (state) => state.course);
    const {token} = useSelector ((state)=> state.auth);
    const dispatch = useDispatch();

    const {handleSubmit, setValue, getValues, register} = useForm();

    useEffect(()=> {
        if(course?.status== COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
    },[])


    const goBack = ()=> {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState())
        //navigate("/dashboard/courses")
    }

    const handleCoursePublish = async () => {
        //if course data not updated
        if( (course?.status == COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            console.log("Status value on page",course?.status)
            goToCourses();
            return;
        }

        //if course value updated

        const formData  = new FormData();
        formData.append("courseId",course._id);
        const statusValue = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

        formData.append("status",statusValue);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result){
            goToCourses();
        }
        setLoading(false)
    }

    const onSubmit = () => {
         handleCoursePublish();
    }
  return (
    <div className='mt-5'>
        <p className='text-white text-2xl font-semibold'>Publish Settings</p>

        <form 
        onSubmit={handleSubmit(onSubmit)}
        className='mt-5'>
        <div>
             <label htmlFor='public'
                className='h-4 w-4'
                >
                    <input
                        type='checkbox'
                        id='public'
                        {...register("public")}
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                    />
                    <span className='ml-3'>
                    Make this Course Public

                    </span>
            </label>
        </div>

        <div className='flex justify-end mt-5 gap-x-3'>
            <button
                onClick={goBack}
                disabled={loading}
                className=' rounded-md bg-richblack-300 p-3 cursor-pointer '
            >
                Back
            </button>

            <IconBtn
                text="Save Changes"
                type="Submit"
                disabled={loading}
            />
        </div>

        </form>

    </div>

  )
}

export default PublishCourseForm