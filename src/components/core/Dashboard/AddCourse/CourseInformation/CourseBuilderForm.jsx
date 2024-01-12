import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import {MdAddCircleOutline} from "react-icons/md"
import{BiRightArrow} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import {setStep,setEditCourse, setCourse} from "../../../../../slices/courseSlice"
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {

  const {register, setValue, handleSubmit,formState:{errors} } = useForm();
  const [editSectionName, setEditSectionName] = useState(false);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token}  = useSelector( (state) => state.auth);
  const[loading, setLoading] = useState(null);


  const goBack = () => {
      console.log("Into the goBack")
      dispatch(setStep(1));
      dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    console.log("Into goto to next")

    if(course?.courseContent?.length === 0 ){
      toast.error("Please add at least one section");
      return;
    }
    if(course.courseContent.some( (section) => section.subSection.length === 0)){
      toast.error("Please add at least one subSection");
      return;
    }

    //EveryThing is good then go to step 3
    dispatch(setStep(3));
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName","")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    console.log("SectionId in handleChangeEditSectionName is ",sectionId);
    console.log("SectionName in handleChangeEditSectionName is ",sectionName);
    if(editSectionName == sectionName){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }


  const onSubmit = async (data) =>{

    console.log("Into the onSubmit function");
    console.log("Course value is ", course);

    let result = null;
    //loading true
    setLoading(true)

    //Editing a section
    if(editSectionName){
      console.log("EditSection Name is",editSectionName)

       result = await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionName,
        courseId: course._id
      }, token);

      console.log("Result after updating course Section", result)

    }
    //creating new Section
    else{
       result = await createSection( {
        sectionName: data.sectionName,
        courseId: course._id,
       },token);
       console.log("Result after creating course Section", result);
    }

    //update value
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","")
    }

    console.log("Course value in Builder", course)
    //loading stop
    setLoading(false);

  }



  return (
    <div>
      <p className='text-white text-xl mt-5'>Course Builder</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-5'>
          <label htmlFor='sectionName' className='text-richblack-5 p-2 m-2'>Section Name<sup>*</sup></label>
          <input
            id='sectionName'
            {...register("sectionName",{required:true})}
            className='w-full rounded-md bg-richblack-700  text-richblack-5 p-2 m-2'
          />
          {
            errors.sectionName && (
              <span>Section Name is required</span>
            )
          }
        </div>


        <div className='flex gap-5'>

          <IconBtn
            type="Submit"
            text={ editSectionName ? "Edit Section" : "Create Section"}
          >
          <MdAddCircleOutline/>
          </IconBtn>
          {
            editSectionName && (
              <button
                type="button"
                className=' underline'
                onClick={cancelEdit}
              >
                Cancel Edit
              </button>
            )
          }

        </div>
      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName = {handleChangeEditSectionName}/>
        )
      }

      <div className='flex justify-end gap-x-3'>
        <button
          onClick={goBack}
          className=' rounded-md cursor-pointer flex items-center'
        >
          Back
        </button>

        <IconBtn
         text="Next"
         type="button"
         onClick={goToNext}
        >
          <BiRightArrow/>
        </IconBtn>
      </div>

    </div>
  )
}

export default CourseBuilderForm