const express = require("express");
const router = express.Router();


//importing controller
const{capturePayment, verifyPayment, sendPaymentSuccessfullEmail } = require("../controllers/Razorpay");

const{auth, isStudent} = require("../middlewares/auth");


//defining a routes
router.post("/capturePayment",auth , isStudent, capturePayment);

router.post("/verifyPayment",auth, isStudent, verifyPayment);

router.post("/sendPaymentSuccessEmail", auth , isStudent, sendPaymentSuccessfullEmail);

//export module
module.exports = router;