import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import {RxCross2} from "react-icons/rx"
import IconBtn from '../../../../common/IconBtn';
import Upload from "../Upload"

const SubSectionModal = ({
  modalData,
  setModalData,
  view = false,
  edit = false,
  add = false
}) => {

  const {course} = useSelector( (state) => state.course);
  const {token} = useSelector ((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const{
    setValue,
    getValues,
    register,
    formState: {errors},
    handleSubmit

  } = useForm();

  useEffect( ()=>{
    if(view || edit){
      setValue("lectureTitle",modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo",modalData.videoUrl);
    }
  },[]);


  const isFormUpdate =() => {
    const currentValue = getValues();
    if(currentValue.lectureTitle != modalData.title ||
      currentValue.lectureDesc != modalData.discription ||
      currentValue.lectureVideo != modalData.videoUrl ){
        return true;
      }
      else{
        return false;
      }
  }


  const handleEditSubSection = async () =>{
    const formData = new FormData();
    const currentValue = getValues();

    formData.append("subSectionId", modalData._id);
    formData.append("sectionId",modalData.sectionId)

    if(currentValue.lectureTitle != modalData.title){
      formData.append("title", currentValue.lectureTitle)
    }

    if(currentValue.lectureDesc != modalData.description){
      formData.append("description", currentValue.lectureDesc);
    }

    if(currentValue.lectureVideo != modalData.videoUrl){
      formData.append("video",currentValue.lectureVideo);
    }

    setLoading(true);

    const result = await updateSubSection (formData, token);

    if(result){

      const updatedCourseContent = course.courseContent.map((section) =>
      section._id === modalData.sectionId ? result : section
    )  

      const updatedCourse = {...course, courseContent:updatedCourseContent}

      dispatch(setCourse(updatedCourse))
      toast.success("SubSection Updated successfully");
    }
    setModalData(null);
    setLoading(false);

  }

  const onSubmit = async (data) => {

    //for view
    if(view){
      return;
    }

    //for Edit
    if(edit){
      if(!isFormUpdate()){
        toast.error("No changes made to the form")
      }
      else{
        handleEditSubSection()
      
      }
    }

    //for Add

    const formData = new FormData();
    console.log("Printing Modal Data",modalData)
    formData.append("title",data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoUrl", data.lectureVideo);
    formData.append("sectionId",modalData._id);

    setLoading(true);

    console.log("form Data ",formData)

    const result = await createSubSection(formData,token);

    console.log("Result after CREATE SUB SECTION is ",result);
    if(result){

      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData._id ? result : section
      )  

      const updatedCourse = {...course, courseContent:updatedCourseContent}

      dispatch(setCourse(updatedCourse))
      toast.success("Sub Section added");
    }
    setModalData(null);
    setLoading(false);

  }



  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>

      <div className=' my-10 w-11/12 max-w-[700px] rounded-t-lg bg-richblack-700 p-5 '>
        <div className='flex items-center justify-between p-3'>
          <p className=' text-xl font-semibold text-richblack-5'>
            {edit && "Editing"} {add && "Adding"} {view && "Viewing"}</p>
          <RxCross2 className=' text-2xl text-richblack-5'
            onClick={()=> {setModalData(null)}}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}
        className=' space-y-8 px-8 py-10'>

        {/* Lecture video Upload */}
        <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue= {setValue}
          errors = {errors}
          video = {true}
          viewData = {view ? modalData.videoUrl : null}
          editData ={edit ? modalData.videoUrl : null}
        />

        {/* Lecture Title */}
        <div className='flex flex-col space-y-2'>
          <label className='text-sm text-richblack-5' htmlFor='lectureTitle'>
            Lecture Title {!view && <sup className=' text-pink-200'>*</sup>}
            </label>
          <input
            disabled={view || loading}
            type='text'
            id='lectureTitle'
            placeholder='Enter Lecture Title'
            {...register("lectureTitle",{required:true})}
            className='w-full rounded-md p-2 m-2 bg-richblack-700  text-richblack-5 '
          />
          {
            errors.lectureTitle && (
              <span className='ml-2 text-sm tracking-wide text-pink-200'>
              Lecture title is required</span>
            )
          }
        </div>

        <div className='flex flex-col space-y-2'> 
          <label className='text-sm text-richblack-5'
           htmlFor='lectureDesc'>Lecture Discription
           {!view && <sup className='text-pink-200'>*</sup>}
           </label>
          <textarea
            id='lectureDesc'
            disabled={view || loading}
            placeholder='Enter Lecture Description'
            {...register("lectureDesc",{required:true})}
            className='w-full rounded-md p-2 m-2 bg-richblack-700  text-richblack-5 resize-x-none  max-h-[130px] '
          />
          {
            errors.lectureDesc && (
              <span className='ml-2 text-sm tracking-wide text-pink-200'>
              Lecture Description is required</span>
            )
          }
        </div>
          
          {
            !view && (
              <div className='flex justify-end'>
                <IconBtn
                  text={edit ? "Save Changes" : "Save" }
                />
              </div>
            )
          }

        </form>

      </div>

    </div>
  )
}

export default SubSectionModal