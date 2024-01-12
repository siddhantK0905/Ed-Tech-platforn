import { toast } from "react-hot-toast";
import {setLoading, setToken} from "../../slices/authSlice"
import {apiConnector} from "../apiConnector"
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";


const {
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API
} = endpoints


export function getResetPasswordToken(email,setEmail){
    return async (dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email})
            console.log(response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("email sent")
            setEmail(true) 
        }
        catch(err){
            toast.error("Unable to sent mail");
            console.error(err);
        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(password, confirmPassword, token) {

    return async(dispatch) => {
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token})

            console.log("Response from reset-password is",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password re-setted")
        }
        catch(err){
            console.error(err);
            toast.error("Problem in re-setting password")
        }
        dispatch(setLoading(false))
    }
}

export function sendOtp (email,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",SENDOTP_API,{email});
            console.log("Response from send OTP ", response);

            if(!response.data.success){
                throw new Error (response.data.message)
            }

            toast.success("OTP Sent successfully")
            navigate("/verify-email");
        }
        catch(err){
            console.error(err);
            toast.error("Unable to send OTP")
        }

        dispatch(setLoading(false));
    }
}

export function signUp (firstName, lastName,
    email,
    password,
    confirmPassword,
    accountType,
    otp,
    navigate) {

        return async(dispatch) => {
            dispatch(setLoading(true));
            try{
                const response = await apiConnector("POST", SIGNUP_API ,{firstName, lastName,
                    email,
                    password,
                    confirmPassword,
                    accountType,
                    otp,
                    navigate})

                console.log("response from signUp", response)
                
                if(!response.data.success){
                    throw new Error (response.data.message)
                }
                toast.success("Sign Up Successfully")
                navigate("/login")
            }
            catch(err){
                console.error(err);
                toast.error("Unable to sign Up")
            }
            dispatch(setLoading(false))
        }
}

export function login (email,password,navigate){
    return async (dispatch) =>{
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST",LOGIN_API,{email,password} )
            console.log("Response from login ", response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successfully")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.existUser?.image
              ? response.data.existUser.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existUser.firstName} ${response.data.existUser.lastName}`

            dispatch(setUser({ ...response.data.user, image: userImage }))


            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.existUser))
            console.log("User ==",response.data.existUser)

            navigate("/dashboard/my-profile")
        }
        catch(err){
            console.error(err);
            toast.error("Unable to log in")
        }
        dispatch(setLoading(false));
    }
}

export function logout(navigate) {
    return(dispatch) => {
        console.log("Into the logout method of authAPI")
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("logged Out")
        navigate("/")
    }
}