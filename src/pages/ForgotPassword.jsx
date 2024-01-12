import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BsArrowLeftShort} from 'react-icons/bs'
import { getResetPasswordToken } from '../services/operations/authAPI' 
import { Link } from 'react-router-dom'


const ForgotPassword = () => {

    const [email,setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const {loading} = useSelector( (state)=> state.auth);
    const dispatch = useDispatch()



    function onSubmit(event) {
        console.log("into the submit Handler")
        event.preventDefault();
        dispatch(getResetPasswordToken(email,setEmailSent))
    }

  return (
    <div className='flex mx-auto items-center justify-center max-w-[450px] mt-36'>
        {
            loading ? (<div className=' text-richblack-5'>
                loading...</div>)
            :(
                <div className='flex flex-col gap-5 '>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        {
                            !emailSent ? "Reset your password" : "Check email"
                        }
                    </h1>

                    <p className='text-[1.125rem] leading-[1.625rem] text-richblack-300'>
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                   : `We have sent the reset email to ${email}` 
                        }
                    </p>
                    <form onSubmit={onSubmit}
                    className='flex flex-col gap-4 '
                    >  
                        
                            {
                                !emailSent && 
                                <div className='flex flex-col gap-5 text-richblack-5'>
                                    <label className=''
                                    >
                                        Email Address 
                                    </label>
                                     <input
                                        type='email'
                                        name='email'
                                        placeholder='Enter email address'
                                        className='bg-richblack-800 rounded-md p-2 -mt-4'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                     />

                                </div>    
                            }
                            <button
                                type='submit'
                                className=' bg-yellow-200 rounded-md text-richblack-900 text-center p-2 font-semibold mt-8'
                            >
                                {
                                    !emailSent ? "Reset Password" : "Resend email"
                                }
                            </button>
                    </form>

                    <Link to="/login">
                        <div className='flex flex-row gap-2 text-richblack-5 text-[1.125rem] leading-[1.625rem] items-center '>
                            <BsArrowLeftShort/>
                            Back to login
                        </div>
                    </Link>


                </div>


            )
        }

    </div>
  )
}

export default ForgotPassword