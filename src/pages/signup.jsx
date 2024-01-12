import React from 'react'
import Template from '../components/core/Auth/Template'
import SignupImage from "../assets/Images/signup.webp"


const signup = () => {
  return (
    <div>
        <Template
          title= "Join the millions learning to code with StudyNotion for free"
          description1= "Build skills for today, tomorrow, and beyond."
          description2= "Education to future-proof your career."
          formType="submit"
          img={SignupImage}
        />
    </div>
  )
}

export default signup