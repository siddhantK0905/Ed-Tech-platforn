import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const {token} = useSelector( (state) => state.auth)

    if(token != null){
      console.log("Children rendering");
        return children
    }
    else{
        console.log("Token for children is null")
        return <Navigate to="/login"/>
    }

}

export default PrivateRoute