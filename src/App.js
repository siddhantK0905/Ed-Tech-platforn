import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/login"
import Signup from "./pages/signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail"
import AboutPage from "./pages/AboutPage";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse/Index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/Edit-Course/EditCourse";
import Catalog from "./pages/Catalog";


function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter"> 
    <Navbar/>
      <Routes>
          <Route path="/" element= <Home/>></Route>
          <Route path="/login" element = <Login/> > </Route>
          <Route path="/signup" element =<Signup/> > </Route>
          <Route path = "/forget-password" element= <ForgotPassword/> > </Route>
          <Route path="/update-password/:id" element= <UpdatePassword/> > </Route>
          <Route path="/verify-email" element=<VerifyEmail/> > </Route>
          <Route path="/about" element= <AboutPage/> > </Route>

          <Route
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" element= <MyProfile/> > </Route>

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/enrolled-courses" element= <EnrolledCourses/>/>
                  <Route path="/dashboard/cart" element= <Cart/>/>
                </>
              )
            }
            
            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                  <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                  <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>

                </>
              )
            }


          </Route>

          <Route path="/catalog/:catalogName" element={<Catalog/>}></Route>
         

          <Route path="*" element= <Error/> />

      </Routes>

    </div>
  );
}

export default App;
