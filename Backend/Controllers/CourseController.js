import Course from "../Models/Course.js";


// Get All Courses

export const getAllCourses = async (req, res) => {

    try {
        
        const courses = await Course.find({
            IsPublished : true
        }).select(['-courseContent', '-enrolledStudents']).populate({path:'educator', select: 'name image'});

        res.json({success : true, courses});
    } catch (error) {
        res.json({success : false, message : error.message});
    }
}

// Get Course By Id

export const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const courseData = await Course.findById(id)
        .select(['-enrolledStudents'])
        .populate({path:'educator', select: 'name image'});

        // remove lecture url if isPreviewFree is false

        courseData.courseContent.forEach((chapter) => {
            chapter.chapterContent.forEach((lecture) => {
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl = undefined;
                }
            })
        })

        res.json({success : true, courseData});
    } catch (error) {
        res.json({success : false, message : error.message}); 
    }
}