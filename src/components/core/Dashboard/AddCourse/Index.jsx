import RenderSteps from "./RenderSteps";

export default function AddCourse (){
    return(
        <>
            <div className="flex w-full items-center gap-x-6">
                <div className="flex flex-1 flex-col">
                    <h1 className="text-3xl mb-14 font-medium text-richblack-5">Add Course</h1>
                    <div className=" flex-1">
                        <RenderSteps/>
                    </div>
                </div>
                <div className=" sticky top-10 hidden flex-1 border-[1px] bg-richblack-800 border-richblack-700 rounded-md p-6 xl:block">
                    <p className=" mb-8 text-lg text-richblack-5">⚡Course Upload Tips</p>
                    <ul className="ml-5 list-item list-disc sapce-y-4 text-xs text-richblack-5">
                        <li>Set course price option or make it free</li>
                        <li>Standard size for course thumbnail is 1024*256</li>
                        <li>Video selection controls the course overview video.</li>
                        <li>Course builder is where you create and organize the course</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}