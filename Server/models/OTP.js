const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;




// const mongoose = require("mongoose");
// const mailSender = require("../utils/mailServer");

// const OTPSchema = new mongoose.Schema({
//     email :{
//         type:String,
//         required:true,
//     },
//     otp:{
//         type : String,
//         required:true,
//     },
//     createdAt:{
//         type: Date,
//         default : Date.now(),
//         expires : 5*60,
//     }
// })


// async function sendVerificationEmail(email , otp){
//     try{
//         const mailResponse = await mailSender(email,"Verification Email From Study Notion", otp);
//         console.log("Email send successfully ",mailResponse);
//     }
//     catch(err){
//         console.log("Error occured at sending email ", err);
//         throw err;
//     }
// }

// OTPSchema.pre("save", async function(next){
//     await sendVerificationEmail(this.email,this.otp);
//     next(); 
// })

// module.exports = mongoose.model("OTP",OTPSchema);