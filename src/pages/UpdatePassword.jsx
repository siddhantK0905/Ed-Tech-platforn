import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import { useLocation } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'

const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch();
    const location = useLocation()

    const [formData , setFormData] = useState( {
        password : "",
        confirmPassword : "",
    })

    const {password, confirmPassword} = formData;
    const token = location.pathname.split("/").at(-1);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const loading = useSelector((state) => state.auth)

    function onChangeHandler ( e ) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
    }

    function onSubmitHandler (event) {
        event.preventDefault();
        dispatch( resetPassword(password , confirmPassword , token) )
    }

  return (

    <div className='w-[450px] flex mx-auto items-center justify-center text-richblack-5 max-w-maxContent mt-36'>

        {
            !loading ? (<div>Loading...</div>) 
            :
            (
                <div className='flex flex-col gap-5 text-richblack-5'>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        Choose  new password
                    </h1>
                    <p className='text-[1.125rem] leading-[1.625rem] text-richblack-300 -mt-2'>
                        Almost done. Enter your new password and youre all set.
                    </p>

                    <form onSubmit={onSubmitHandler}
                        className='flex flex-col gap-5 text-richblack-5 relative'
                    >

                        <label className='flex flex-col gap-5 relative'>
                            <p>New Password <sup className=' text-pink-300' >*</sup>
                             </p>
                            <input
                                type= {showPassword ? "text" : "password"}
                                name='password'
                                value={password}
                                onChange= {onChangeHandler}
                                className='bg-richblack-800 rounded-md p-2 -mt-4'
                            />
                            <div onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute left-[93%] bottom-[20%] cursor-pointer'>
                                    {
                                        showPassword ? (<AiOutlineEyeInvisible font={24} fill="#AFB2BF"/>) :(<AiOutlineEye font={24} fill="#AFB2BF"/>)
                                    }
                                </div>
                        </label>

                        <label className='flex flex-col gap-5 relative'>
                           <p>confirm new password <sup className=' text-pink-300' >*</sup> </p>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={onChangeHandler}
                                className='bg-richblack-800 rounded-md p-2 -mt-4'
                            />

                            <div onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className='absolute left-[93%] bottom-[20%] cursor-pointer'>
                                    {
                                        showConfirmPassword ? (<AiOutlineEyeInvisible font={24} fill="#AFB2BF"/>) :(<AiOutlineEye font={24} fill="#AFB2BF"/>)
                                    }
                                </div>
                        </label>


                        <button type='submit'
                            className=' bg-yellow-200 rounded-md text-richblack-900 text-center mt-1 p-2 font-semibold'
                        >
                            Reset Password
                        </button>
                    </form>

                </div>
            )
        }
        

    </div>
  )
}

export default UpdatePassword