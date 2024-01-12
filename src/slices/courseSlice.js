// import { createSlice } from "@reduxjs/toolkit"

//   const initialState = {
//     step: 1,
//     course: null,
//     editCourse: false,
//     paymentLoading: false,
//   }

// const courseSlice =createSlice({
//   name: "course",
//   initialState,
//   reducers: {
//     setStep: (state, action) => {
//       state.step = action.payload
//     },
//    setCourse: (state, action) => {
//       console.log("Action for SetCourse is", action);
//       state.course = action.payload;
//       console.log("Course value in CourseSlice is ", state.course);
//     },
//     setEditCourse: (state, action) => {
//       state.editCourse = action.payload
//     },
//     setPaymentLoading: (state, action) => {
//       state.paymentLoading = action.payload
//     },
//     resetCourseState: (state) => {
//       state.step = 1
//       state.course = null
//       state.editCourse = false
//     },
//   },
// })

// export const {
//   setStep,
//   setCourse,
//   setEditCourse,
//   setPaymentLoading,
//   resetCourseState,
// } = courseSlice.actions

// export default courseSlice.reducer



 import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
     step : 1,
     course: null,
     editCourse : false,
     paymentLoading : false
 }
 export const courseSlice = createSlice ( {
     name:"course",
     initialState,
     reducers:{
         setStep: (state, action) => {
             state.step = action.payload
           },
         setCourse: (state , action) => {
             state.course = action.payload;
             console.log("Course value in CourseSlice is ", state.course);
         },
         setEditCourse: (state, action) => {
             state.editCourse = action.payload;
         },
         setPaymentLoading: (state, action) => {
             state.paymentLoading = action.payload;
         },
         resetCourseState: (state) => {
             state.step = 1
             state.course = null
             state.editCourse = false;
         }
     }
 })

 export const {setStep, setCourse, setEditCourse, setPaymentLoading,setCourseState,resetCourseState} = courseSlice.actions;

 export default courseSlice.reducer;