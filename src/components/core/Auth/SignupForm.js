import React, { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../../../services/operations/authAPI'
 
const SignupForm = () => {

  const [formData, setFormData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password :'',
    confirmPassword :""
})

  const[accountType, setAccountType] = useState("Student");



 const { firstName, lastName, email, password, confirmPassword } = formData
 const dispatch = useDispatch()
 const navigate = useNavigate()
 
  const[showPassword,setShowPassword] = useState(false)
  const[showConfirmPassword, setShowConfirmPassword] = useState(false)

  function ChangeHandler ( event){
    setFormData((prev)  => (
      {
        ...prev,
        [event.target.name] : event.target.value
      }
    ))
  }

  
  function submitHandler( event ){
    event.preventDefault();

    const signUpData = {
      ...formData,
      accountType,
    }
  
  
    dispatch(setSignupData(signUpData))

    dispatch(sendOtp(formData.email,navigate))

    setFormData({
      firstName :"",
      lastName:"",
      email :"",
      password:"",
      confirmPassword:"",
     })
     setAccountType("Student");
  }


  return (
    <div className='mt-5'>
        <div className='flex flex-col gap-6 text-richblack-5'>
           <form onSubmit={submitHandler}
           className='flex flex-col gap-5'>
                <div className='flex flex-row gap-2'>
                  <label>
                    First name<sup className=" text-pink-300">*</sup>
                    <input
                      type = "text"
                      name ="firstName"
                      placeholder='Enter first name'
                      value={firstName}
                      onChange={ChangeHandler}
                      className=' bg-richblack-800 rounded-md p-2'
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    />
                  </label>
                  <label>
                    Last name<sup className=" text-pink-300">*</sup>
                    <input
                      type = "text"
                      name ="lastName"
                      value={lastName}
                      placeholder='Enter last name'
                      onChange={ChangeHandler}
                      className=' bg-richblack-800 rounded-md p-2'
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    />
                  </label>
                </div>

              <label>
                Email Address<sup className=" text-pink-300">*</sup> 
              </label>
              <input
                  type='email'
                  placeholder='Enter email address'
                  name='email'
                  value={email}
                  onChange={ChangeHandler}
                  className=' bg-richblack-800 rounded-md p-2 -mt-4'
                  style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />

                


              <div className='flex flex-row gap-2'>
                  <label className='relative'>
                    Create password<sup className=" text-pink-300">*</sup>
                    <input
                      type = {showPassword ? "text" :"password" }
                      name ="password"
                      placeholder='Enter Password'
                      value={password}
                      onChange={ChangeHandler}
                      className=' bg-richblack-800 rounded-md p-2'
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    />
                  
                  <div onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <AiOutlineEyeInvisible className='absolute left-[85%] bottom-[17%]'/> : <AiOutlineEye className='absolute left-[85%] bottom-[17%]'/>}
                  </div>

                  </label>

                  <label className=' relative'>
                    Confirm password<sup className=" text-pink-300">*</sup>
                    <input
                      type = {showConfirmPassword ? "text" :"password"}
                      name ="confirmPassword"
                      placeholder='confirm password'
                      value={confirmPassword}
                      onChange={ChangeHandler}
                      className=' bg-richblack-800 rounded-md p-2'
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    />
                   <div onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      {showConfirmPassword ? <AiOutlineEyeInvisible className='absolute left-[83%] bottom-[17%]'/> : <AiOutlineEye className='absolute left-[83%] bottom-[17%]'/>}
                  </div>
                  </label>
                </div>

              <button type='submit'
               className=' bg-yellow-200 rounded-md text-richblack-900 text-center mt-1 p-2 font-semibold'>
                Create Account
              </button>


           </form>
        </div>
    </div>
  )
}

export default SignupForm