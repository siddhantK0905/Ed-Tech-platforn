const express = require("express");
const app = express();

//importing all routes
const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course")
 
//
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const {cloudinaryConnect} = require("./config/cloudinary");
const dotenv = require("dotenv");
dotenv.config();
const fileUpload = require("express-fileupload")

const PORT = process.env.PORT;

//database connection
database.connect();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors(
        {
            origin : "http://localhost:3000",
            Credential:true
        }
    )
)

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir: "/temp",
    })
)

//cloudinary connect 
cloudinaryConnect();


//defining routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

//def routes
app.get("/", (req,res)=> {
    return res.json({
        success:true,
        message:"Your server is up and runnning...."
    })
})


//start the sercver
app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`)
})