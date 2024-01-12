import React, { useState } from 'react'
import { useEffect } from 'react';

const RequirementField = ({label, name, placeholder, register, errors, setValue, getValue}) => {

    const[requirement, setRequirement] = useState("");
    const[requirementsList, setRequirementsList] = useState([]);

    const handleAddRequirement = () => {
        if(requirement){
            setRequirementsList([...requirementsList,requirement]);
//setRequirement("");
        }
    }
    const handleRemoveRequirements = (index) => {
        const temp = [...requirementsList];
        temp.splice(index,1);
        setRequirementsList(temp)
    }

    useEffect( ()=>{
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    },[])

    useEffect( ()=> {
        setValue(name, requirementsList)
    }, [requirementsList])


  return (
    <div>
        <div>
            <label htmlFor={name} className=' text-richblack-5 p-2 m-2'>{label}<sup className=' text-pink-200'>*</sup></label>
            <input
                type='text'
                id= {name}
                placeholder={placeholder}
                value={requirement}
                onChange={(event)=> setRequirement(event.target.value)}
                className='w-full rounded-md p-2 m-2 bg-richblack-700  text-richblack-5'
            />
            <button
                type='button'
                onClick={handleAddRequirement}
                className=' font-semibold text-yellow-50'
            >
                Add
            </button>
        </div>
        {
            requirementsList.length > 0 && (
                <ul>
                    {
                        requirementsList.map( (requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5 gap-x-2'>
                               <span>{requirement}</span>
                                <button
                                    type='button'
                                    onClick={() => handleRemoveRequirements(index)}
                                    className=' text-xs text-pure-greys-300'
                                >
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span>{label} is required**</span>
            )
        }
    </div>
  )
}

export default RequirementField