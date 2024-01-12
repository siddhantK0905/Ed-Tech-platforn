import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import{RxDropdownMenu} from "react-icons/rx"
import { useEffect } from 'react';
import {MdEdit} from 'react-icons/md'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {BiDownArrow} from "react-icons/bi"
import { FaPlus } from "react-icons/fa"
import ConformationModel from '../../ConformationModal'
import SubSectionModal from './SubSectionModal';
import {deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI"
import {setCourse} from "../../../../../slices/courseSlice"

const NestedView = ({handleChangeEditSectionName}) => {

  const{course} = useSelector( (state)=> state.course);
  const{token} = useSelector ( (state)=> state.auth);
  const[viewSubSection, setViewSubSection] = useState(null);
  const[editSubSection, setEditSubSection] = useState(null);
  const[addSubSection, setAddSubSection] = useState(null);
  const [conformationModal , setConformationModal] = useState(null);

  const dispatch = useDispatch();

  const handleDeleteSection = async( sectionId) => {

    const result = await deleteSection({
      sectionId,
      courseId:course._id,
    },token )

    console.log("Result after deleting a Section", result);

    if(result){
      dispatch(setCourse(result))
    }

    setConformationModal(null);
  }

  const handleDeleteSubSection = async( subSectionId, sectionId) => {
    
    const result = await deleteSubSection({sectionId,subSectionId},token);

    if(result){
      const updatedCourseContent = await course.courseContent.map((section) => 
        section._id === sectionId ? result : section
      )
      const updatedCourse = {...course, courseContent:updatedCourseContent}
      dispatch( setCourse(updatedCourse));
    }
    setConformationModal(null)
  }

  useEffect(()=>{
    console.log("Course value in Nested view is", course)
  },[])

  return (
    <div className='mt-2 bg-richblack-700 rounded-lg p-6 px-8 mb-10 text-richblack-5'>
      <div>
          {

            course?.courseContent && course?.courseContent?.map( (section) => (
              <details key={section._id} open>

                <summary className=' flex items-center justify-between p-2 cursor-pointer border-b-2 border-b-richblack-600'>

                  <div className='flex items-center gap-x-3'>
                    <RxDropdownMenu/>
                    <p>{section.sectionName}</p>
                  </div>

                  <div className='flex items-center gap-x-3'>
                    <button
                    onClick={()=>handleChangeEditSectionName(section._id, section.sectionName)}
                    >
                      <MdEdit className='text-xl text-richblack-300'/>
                    </button>

                    <button
                     onClick={ () => {
                      setConformationModal({
                        text1 :"Delete this Section",
                        text2 :"All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler : () => setConformationModal(null)
                      })
                     }}
                     
                    >
                      <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                    </button>
                    
                    <span className='font-medium text-richblack-300'>|</span>
                    <BiDownArrow className={`text-xl text-richblack-300`} />


                  </div>

                </summary>

                <div className=' px-6 pb-4'>
                  {
                    section?.subSection && section?.subSection.map( (data) => (
                      <div key={data._id} 
                        onClick={()=> setViewSubSection(data)}
                        className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 '
                      >
                        <div className='flex items-center gap-x-2 py-2'>
                          <RxDropdownMenu className="text-2xl text-richblack-50"/>
                          <p className='font-semibold text-richblack-50'>{data.title}</p>
                        </div>

                        <div className='flex gap-x-3 items-center'
                        onClick={(e)=> e.stopPropagation()}
                        >
                          <button
                            onClick={()=> { setEditSubSection({...data, sectionId:section._id})}}
                          >
                            <MdEdit className="text-xl text-richblack-300" />
                          </button>

                          <button
                            onClick={()=> {
                              setConformationModal({
                                text1: "Delete this subSetion",
                                text2 : "Selected subSection will be deleted",
                                btn1Text:"Delete",
                                btn2Text:"cancel",
                                btn1Handler: ()=> handleDeleteSubSection(data._id, section._id) ,
                                btn2Handler: ()=> setConformationModal(null)
                              })
                            }}
                          >
                          <RiDeleteBin6Line className="text-xl text-richblack-300" />
                          </button>

                        </div>

                      </div>
                    ))
                  }

                  <button
                  onClick={() => {setAddSubSection(section)}}
                  className=' mt-3 flex items-center gap-x-2 text-yellow-50 '
                  >
                  <FaPlus className="text-lg" />
                    Add Lecture
                  </button>
                </div>
                
              </details>
            ))
          }
      </div>

      {
        addSubSection ? <SubSectionModal 
          modalData = {addSubSection}
          setModalData = {setAddSubSection}
          add = {true}
        />:
        editSubSection ? <SubSectionModal
          modalData = {editSubSection}
          setModalData = {setEditSubSection}
          edit= {true}
        />:
        viewSubSection ? <SubSectionModal
          modalData = {viewSubSection}
          setModalData = {setViewSubSection}
          view = {true}
        />:
        <div></div>
      }

      {
        conformationModal ? (<ConformationModel
          modalData={conformationModal}
        />):<div></div>
      }

    </div>
  )
}

export default NestedView