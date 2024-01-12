const express = require("express");
const router = express.Router();


//importing controller
const{capturePayment, verifySignature } = require("../controllers/Razorpay");

const{auth, isStudent} = require("../middlewares/auth");


//defining a routes
router.post("/capturePayment",auth , isStudent, capturePayment);

router.post("/verifySignature",verifySignature)

//export module
module.exports = router;