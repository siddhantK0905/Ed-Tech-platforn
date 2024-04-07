import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {
    const {token} = useSelector((state)=> state.auth);
    
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const getEnrolledCourses = async () => {
      try {
        const res = await getUserEnrolledCourses(token);
  
        console.log("Res is ", res)

        setEnrolledCourses(res);
        
        console.log("enrolledCourses value is", enrolledCourses);


      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    };
    useEffect(() => {
      getEnrolledCourses();
    }, [])
    

  return (
    <div>
        <p>Enrolled Courses </p>

        {
          !enrolledCourses ? (<div>
            Loading...
          </div>)
          :
           !enrolledCourses.length ? (<p>You have not enrolled any courses yet </p>)
            :
            (
              <div>
                <div>
                  <p>Courses</p>
                  <p>Duration</p>
                  <p>Price</p>
                  <p>Action</p>
                </div>

                {/* Showing Cards details */}
                  {
                  
                    enrolledCourses.map((index, course) => (
                      <div>
                        <div>
                          <img src={course.thumbnails}/>
                          <div>
                            <p>{course.courseName}</p>
                            <p>{course.courseDescription}</p>
                          </div>
                        </div>

                        <div>
                          {course.courseDuration}
                        </div>

                        <div>
                          <p>Progress: {course.progresspercentage || 0}%</p>
                          <ProgressBar
                          completed={course.progresspercentage}
                          height='8px'
                          isLabelVisible={false}
                          />

                        </div>

                      </div>
                    ))
                  }

              </div>
            )
           
        }

    </div>
  )
}

export default EnrolledCourses