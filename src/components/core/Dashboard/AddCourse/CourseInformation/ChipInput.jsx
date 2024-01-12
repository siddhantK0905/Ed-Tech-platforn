import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import{MdOutlineClose} from 'react-icons/md'

const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues
}) => {


    const [chips, setChips] = useState([])
    const {course} = useSelector((state)=>state.course);

    useEffect(()=>{
        //setChips(course?.tags)
        console.log("Chip value is ",chips)
        register(name,{required:true})
    },[])

    useEffect(()=> {
        setValue(name,chips)
        console.log("After setting value",name)
    },[chips])

    const handleDeleteChip= (chipIndex) => {
        const newChips = chips.filter((_,index)=> index !== chipIndex)
        setChips(newChips);
    }

    const handleKeyDown = (event) => {

        if(event.key=="Enter" || event.key==","){
            event.preventDefault();

            const chipValue = event.target.value.trim();
            console.log("ChipValue is ", chips)

            if(chipValue  && !chips.includes(chipValue)
                 ){
                    let newChips;
                    if(chips){
                         newChips = [...chips, chipValue]
                    }
                    else{
                        newChips = chipValue
                    }
                console.log("Into the if")
                setChips(newChips);
                event.target.value=""
            }
        }
    }

  return (
    <div className='flex flex-col space-y-2'>
        <>
            <label className='text-sm text-richblack-5' htmlFor={name}>
                {label} <sup className=' text-pink-200'>*</sup></label>
            
            <div className='flex w-full flex-wrap gap-y-2'>
                {
                    chips && chips.map((chip, index)=>(
                        <div key={index}
                        className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                            {chip}

                            <button
                            type='button'
                            className='ml-2 focus:outline-none'
                            onClick={()=>handleDeleteChip(index)}
                            >
                                <MdOutlineClose className='text-sm'/>
                            </button>
                        </div>
                    ))
                }

            </div>

            <input
                id={name}
                name={name}
                type='text'
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className='w-full rounded-md p-2 m-2 bg-richblack-700  text-richblack-5'
            />

            {
                errors[name] && (<span
                className='ml-2 text-xs tracking-wide text-pink-200'>
                    {label} is required
                </span>)
            }
        </>
    </div>
  )
}

export default ChipInput