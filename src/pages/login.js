import React from 'react'
import loginImage  from "../assets/Images/login.webp"
import Template from '../components/core/Auth/Template'
const login = () => {
  return (
        <Template
            title="Welcome Back"
            description1 = "Build skills for today, tomorrow, and beyond."
            description2 = "Education to future-proof your career."
            formType="login"
            img = {loginImage}
        />
  )
}

export default login