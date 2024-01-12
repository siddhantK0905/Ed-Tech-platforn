import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {RxCountdownTimer} from "react-icons/rx"
import {BiArrowBack} from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { signUp } from '../services/operations/authAPI'



const VerifyEmail = () => {

    const {loading} = useSelector( (state) => state.auth )
    const [otp , setOtp] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const signupData = useSelector ((state) => state.auth)

    if(!signupData){
        navigate("/signup")
    }


    function submitHandler(event){
        event.preventDefault();
        console.log(signupData)
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType
        } = signupData.signupData

        console.log(firstName)

        dispatch(signUp(
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            navigate
        ))
        
    }

    

  return (
    <div className='w-[450px] flex mx-auto max-w-maxContent text-richblack-5 mt-32 '>
        {
            loading ? (<div>Loading....</div>)
            : (
                <div className='flex flex-col gap-5 '>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem]  '> 
                        VerifyEmail
                    </h1>

                    <p className='text-[1.125rem] leading-[1.625rem] text-richblack-300 -mt-2'>
                       A verification code has been sent to you. Enter the code below
                    </p>

                    <form onSubmit={submitHandler}
                        className='flex flex-col gap-5'
                    >

                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} 
                            placeholder="-"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                            />}

                        />

                        <button type='submit'
                            className='bg-yellow-200 rounded-md text-richblack-900 text-center mt-1 p-2 font-semibold'
                        >
                            Verify Email
                        </button>
                    </form>

                    <div className='flex flex-row justify-between'>
                        <Link to="/login"
                        className='flex gap-1 items-center'>
                           <BiArrowBack/> Back to login
                        </Link>
                        <Link to="" 
                        className='flex gap-1 items-center'>
                            <RxCountdownTimer/>Resend it
                        </Link>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail