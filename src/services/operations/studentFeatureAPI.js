import toast from "react-hot-toast";
import{studentEndpoints} from "../apis"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import {apiConnector} from "../apiConnector"
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

async function loadScript (src) {

    return new Promise((resolve) => {
        console.log("Into loading Script");
        const script = document.createElement("script");
        script.src = src;

        script.onload =() =>{
            resolve(true);
        }

        script.onerror =() =>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}


export async function buyCourse (token, courses, useDetails, navigate, dispatch) {

    console.log("Token in buy course is", token);
    
    const toast_id = toast.loading("loading...");
    try{

        console.log("Into by course")
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        console.log("Result after loading  script", res);
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }

        console.log("Printing OrderResponse",orderResponse);

        //Create a option
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount: orderResponse.data.message.amount,
            order_id: orderResponse.data.message.id,
            name: 'Study Notion',
            description:"Thank You For Purchasing The Course",
            image:rzpLogo,
            prefill:{
                name:`${useDetails.firstName}`,
                email: useDetails.email
            },
            handler: function (response) {
                //send successfull mail
                sendPaymentSuccessfullEmail(response, orderResponse.data.message.amount, token);

                //Verify the payment
                verifyPayment({...response, courses},token , navigate, dispatch);
            }
        }

        const paymentObject =  new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(err){
        console.log("Payment API error..",err);
        toast.error("Could not make a payment");
    }
    toast.dismiss();
}


async function sendPaymentSuccessfullEmail (response, amount, token){
    const toastId = toast.loading("Loading....");

    try{
         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,{
            order_id:response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            amount
         },
         {
            Authorization: `Bearer ${token}`
        }
         )
    }

    catch(err){
        console.log("Payment Success Email Error", err);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment...");
    //dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API,bodyData, {
            Authorization:`Bearer ${token}`
        })

        console.log(response);
        console.log("After verifying payment response is ");
        console.log(response.data.success);


        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Payment succesfull you are added to course");
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart())

    }
    catch(err){
        console.log("Payment Verify Error....");
        toast.error("Could not verify payment");
    }

    toast.dismiss();
}