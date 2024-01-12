
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operations/authAPI'

const LoginForm = () => {
 
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      })

    const {email, password} = formData
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function changeHandler (event) {
        setFormData( (prev) =>(
            {
                ...prev,
                [event.target.name] : event.target.value
            }
        ) )
    }

    function submitHandler(event ) {
        event.preventDefault();
        dispatch(login(email,password,navigate))
    }


  return (
    <div className='flex mt-10'>
        <form onSubmit={submitHandler}
        className='flex flex-col gap-5 w-full'>
            
            <label className='w-full'>
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] '>
              Email Address <sup className=' text-pink-300'> * </sup>
              </p> 
              <input
               type='email'
               placeholder='Enter email address'
               name='email'
               value={email}
               onChange={changeHandler}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              />
            </label>

            <label className='w-full relative'>
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password <sup className=' text-pink-300'> * </sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}      // Always keep in mind
                name="password"
                value={password}
                onChange={changeHandler}
                placeholder='Enter password'
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />

                <div onClick={() => setShowPassword((prev) => !prev)}
                  className='absolute left-[93%] bottom-[45%] cursor-pointer'>
                    {
                        showPassword ? (<AiOutlineEyeInvisible font={24} fill="#AFB2BF"/>) :(<AiOutlineEye font={24} fill="#AFB2BF"/>)
                    }
                </div>


              <Link to='/forget-password'>
                <p className='text-blue-200 mt-2 translate-x-[75%] text-[0.875rem]'>
                    Forget Password
                </p>
              </Link>

            
            </label>

            <button type='submit'
             className='w-full bg-yellow-50 text-richblack-800 mt-5 font-semibold p-2 rounded-[0.5rem]'>
                Sign In 
            </button>

        </form>
    </div>
  )
}

export default LoginForm