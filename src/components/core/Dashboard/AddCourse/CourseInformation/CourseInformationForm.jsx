import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseCategories,editCourseDetails, addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import {useForm} from "react-hook-form"
import RequirementField from './RequirementField';
import IconBtn from "../../../../common/IconBtn"
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import RenderSteps from '../RenderSteps';
import ChipInput from './ChipInput';
import Upload from '../Upload';

const CourseInformationForm = () => {

  let { course, editCourse } = useSelector((state) => state.course)

  const [courseCategories, setCourseCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);



  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  } = useForm();

  const getCategories = async () => {
      setLoading(true);
      const response = await fetchCourseCategories();
      console.log("Response from getCategories is", response);
       if(response.length > 0){
        console.log("Into the if")
         await setCourseCategories(response);
       }
       console.log("Value in courseCategories is ",courseCategories)
      setLoading(false);
  }
  

  useEffect( ()=> {

    console.log("Value of edit course is ", editCourse)
    if(editCourse){
      console.log("Edit course is true from CourseInformation")
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.Tag );
      setValue("courseBenefits",course.whatYouWillLearn);
      setValue("courseCategory",course.category);
      console.log("setValue -courseCategory == ", course.category);
      setValue("courseRequirements",course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();

  },[])

  const isFormUpdate = () => {
    const currentValue = getValues();

    if(currentValue.courseTitle != course.courseName ||
      currentValue.courseShortDesc != course.courseDescription ||
      currentValue.coursePrice != course.price ||
      currentValue.courseTags != course.tag ||
      currentValue.courseBenefits != course.whatYouWillLearn||
      currentValue.courseCategory._id != course.category._id ||
      currentValue.courseRequirements.toString() != course.instructions.toString() ||
      currentValue.courseImage != course.thumbnail  ){
        return true;
      }
      else{
        return false;
      }

  }

  const onSubmit = async (data)=> {
      
    if(editCourse){
       if(isFormUpdate){
          const currentValue = getValues();
          const formData = new FormData();

          formData.append("courseId", course._id);

          if(currentValue.courseTitle != course.courseName){
            formData.append("courseName",data.courseTitle )
          }
          if(currentValue.courseShortDesc != course.courseDescription){
            formData.append("courseDescription",data.courseShortDesc)
          }
          if(currentValue.coursePrice != course.price){
            formData.append("price",data.coursePrice)
          }
          if(currentValue.courseBenefits != course.whatYouWillLearn){
            formData.append("whatYouWillLearn",data.courseBenefits)
          }
           if(currentValue.courseCategories._id != course.category._id){
            console.log("data.courseCategory == ", data.courseCategory);
             formData.append("category",data.courseCategory)
           }
          if(currentValue.courseRequirements.toString() != course.instructions.toString()){
            formData.append("instructions",JSON.stringify(data.courseRequirements))
          }
          if (currentValue.courseImage !== course.thumbnail) {
            formData.append("thumbnailImage", data.courseImage)
          }
          if (currentValue.courseTags.toString() !== course.tag.toString()) {
            formData.append("tag", JSON.stringify(data.courseTags))
          }
          setLoading(true);
          const result = await editCourseDetails(formData, token);
          setLoading(false);
          if(result){
            setStep(2);
            dispatch(setCourse(result));
          }
       }
       else{
        toast.error("No changes made so far")
       }

       return;
    }

    //New Course
    console.log("TAG VALUE IS ",JSON.stringify(data.courseTags))
    const formData = new FormData()
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("thumbnailImage", data.courseImage)
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));


    setLoading(true)
    console.log("Printing form data", formData)
    const result = await addCourseDetails(formData,token);
    console.log("Result value is ", result);
    if(result){
      dispatch(setStep(2));
      course = dispatch(setCourse(result)).payload
    }
    console.log("Course value is ",course);
   // console.log("Step value is ", step);
    setLoading(false);

  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=' rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 space-y-8 '
    >
        <div className='flex flex-col space-y-2'>
          <label htmlFor='courseTitle' className=' text-richblack-5 text-sm'>Course Title<sup className=' text-pink-200'>*</sup></label>
          <input
            type='text'
            id='courseTitle'
            placeholder='Enter the course title'
            {...register("courseTitle", {required:true})}
            className='w-full rounded-md p-2 m-2 bg-richblack-700 text-richblack-5' 
          />
          {
            errors.courseTitle && (<span>
              Course Tile is required**
            </span>)
          }
        </div>

        <div>
          <label htmlFor='courseShortDesc' className=' text-richblack-5 p-2 m-2'>Course Short Description<sup className=' text-pink-200'>*</sup></label>
          <textarea
            id='courseShortDesc'
            placeholder='Enter course description'
            {...register("courseShortDesc", {required:true})}
            className='w-full min-h-[130px] rounded-md p-2 m-2 bg-richblack-700  text-richblack-5'
          />
          {
            errors.courseShortDesc && (<span>
              Course Description is required
            </span>)
          }
        </div>

        <div className='relative' >
          <label htmlFor='coursePrice' className=' text-richblack-5 p-2 m-2'>Course Price<sup className=' text-pink-200'>*</sup></label>
          <input
            id='coursePrice'
            placeholder='    Enter course price'
            {...register("coursePrice", {
              required:true,
              valueAsNumber:true,
            })}
            className='w-full rounded-md p-2 m-2 bg-richblack-700  text-richblack-5 '
          />
          <HiOutlineCurrencyRupee className='absolute top-1/2  left-3 text-richblack-50 '/>
          {
            errors.coursePrice && (
              <span>Course price is maditory</span>
            )
          }
        </div>


        <div>
            <label htmlFor='couresCategory' className=' text-richblack-5 p-2 m-2'>Course Category<sup className=' text-pink-200'>*</sup></label>
            <select
              {...register("courseCategory",{required:true})}
              defaultValue=""
              id='courseCategory'
              className='rounded-md p-2 m-2 bg-richblack-700 w-full  text-richblack-5 '
            >
              <option>Choose Category</option>
              {
                 courseCategories!=null && courseCategories.map( (category, index) => (
                  <option key={index} value={category?._id}>
                    {category?.name}
                   </option>
                ))
              }
            </select>
            
            {
              errors.courseCategory && (
                <span>Course Category field is required**</span>
              )
            }
        </div>

        
        {/* Two Components */}

        {/* Tags  */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter tags and press enter"
          register={register}
          errors={errors}
          setValue= {setValue}
          getValue={getValues}

        />

          {/* Upload  */}

          <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
          />

        <div>
          <label htmlFor='courseBenefits' className=' text-richblack-5 p-2 m-2'>Benefits of course<sup className=' text-pink-200'>*</sup></label>
          <textarea
            id='courseBenefits'
            className='w-full min-h-[130px] rounded-md p-2 m-2 bg-richblack-700  text-richblack-5'
            placeholder='Enter benefits of course'
            {...register("courseBenefits",{required:true})}
          />
          {
            errors.courseBenefits && (
              <span>Course Benefits are require**d</span>
            )
          }
        </div>

        <RequirementField
          label="Requirements/Intructions"
          name="courseRequirements"
          placeholder="Enter course requirements"
          register = {register}
          errors = {errors}
          setValue= {setValue}
          getValue = {getValues}
        />

        <div className='flex justify-end gap-x-2 '>
        {
          editCourse && (
            <div>
              <button
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}  
              onClick={()=> dispatch(setStep(2)) }
              >
              Continue Without Saving</button>
            </div>
          )
        }

        <IconBtn
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext/>
        </IconBtn>
        </div>

        
    </form>

      
  )
}

export default CourseInformationForm