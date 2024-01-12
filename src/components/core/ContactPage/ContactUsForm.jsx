import React, { useEffect, useState } from 'react'
import { appendErrors, useForm } from 'react-hook-form'
import { apiConnector } from '../../../services/apiConnector';
import CountryCode from '../../../data/countrycode.json'

const ContactUsForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {error, isSubmitSuccessfull}
    } = useForm();
    
    useEffect( ()=> {
        if(isSubmitSuccessfull){
            reset({
                firstname:"",
                lastname:"",
                email:"",
                message:"",
                phonNo:""
            })
        }
    },[reset,isSubmitSuccessfull] );

    const[loading, setLoading] = useState(false)

    const submitContactForm = async (data) => {
        try{
            setLoading(true)
            //const response = apiConnector("POST", "",data)
            console.log("Response is ",data)
        }
        catch(error){
            console.log("Error in submitting form")
            console.log(error)
        }
        setLoading(false)

    }

  return (
    <form
        className='flex flex-col gap-7'
     onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-5 mt-5 lg:flex-row'>
            {/* First & Last Name */}
            <div className='flex flex-row gap-5'>
                {/* First Name */}
                    <div className='flex flex-col gap-5 lg:flex-row'>
                        <label htmlFor='firstname' className="lable-style">First Name </label>
                        <input
                        type='text'
                        placeholder='Enter First Name'
                        id='firstname'
                        className=' form-style'
                        name='firstname'
                        {...register("firstname", {required:true} ) }
                         />
                         {
                            appendErrors.firstname && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please enter first name
                                </span>
                            )
                         }
                    </div>

                {/* Last Name */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        placeholder='Enter Last Name'
                        name='lastname'
                        id='lastname'
                        className=' form-style'
                        {...register("lastname")}
                    />
                </div>
            </div>

            {/* Email Address */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='lable-style'>Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    className='form-style'
                    placeholder='Enter Email Address'
                    {
                        ...register("email",{required:true})
                    }
                /> 
                {
                    appendErrors.email && (
                        <span>
                            Please enter your email
                        </span>
                    )
                }               
            </div>

            {/* Phone Number */}
            <div className='flex flex-col gap-2'>

                <label htmlFor='phonenumber'>Phone Number</label>

                <div className='flex gap-5 '>
                        <div className='flex w-[81px] flex-col gap-2'>
                            <select
                            name='dropdown'
                            id='dropdown'
                            className=' form-style'
                            {...register("countrycode",{required:true})}
                            >
                            {
                                CountryCode.map( (element , index) => {
                                    return(
                                        <option key={index} value={CountryCode}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                            </select>
                        </div>

                        <div className='flex w-[calc(100%-90px)] flex-col gap-2'> 
                            <input
                                type='number'
                                name='phonenumber'
                                id='phonenumber'
                                placeholder='12345 6789'
                                className='form-style'
                                {
                                    ...register("phonNo",
                                    {
                                        required:{value:true, message:"please enter phone number"},
                                        maxLength:{value:10, message:"Invalid Phone number"},
                                        minLength:{value:8, message:"Invalid Phone number"}
                                        
                                    })
                                }
                            />
                        </div>

                        {
                            appendErrors.phonNo && (
                                <span className=' text-white'>
                                Hiii
                                {appendErrors.phonNo.message}
                            </span>
                            )
                        }

                </div>
            </div>
            
            {/* message */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='message'>Message</label>
                <textarea
                    name='message'
                    id='message'
                     cols="30"
                     rows="7"
                     className=' form-style'
                    placeholder='Enter your message here'
                    {...register("message", {required:true})}
                />
                {
                    appendErrors.message && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please enter your message
                        </span>
                    )
                }

            </div>

        </div>

        <button type='submit'
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
         >
        send message
        </button>
    </form>
  )
}

export default ContactUsForm