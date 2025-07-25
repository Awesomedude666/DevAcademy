import { clerkClient } from '@clerk/express'
import {v2 as cloudinary} from 'cloudinary';
import Course from '../Models/Course.js';
import Purchase from '../Models/Purchase.js';
import User from '../Models/User.js';

// update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const {userId} = req.auth();
        
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role : 'educator',
            }
        })

        res.json({success : true, message : 'You can publish a course now'})
        
    } catch (error) {
        res.json({success : false, message : error.message}); 
    }

}

// Add New Course

export const addCourse = async (req, res) => {
    // --- START OF DETAILED LOGGING ---
    console.log("Step 1: Entering the addCourse function.");
    try {
        const { courseData } = req.body;
        const { userId: educatorId } = req.auth();
        const imageFile = req.file;

        //console.log("Step 2: Checking for image file.");
        if (!imageFile) {
            console.log("Error at Step 2: No image file attached.");
            return res.json({ success: false, message: 'Thumbnail Not Attached' })
        }

        //console.log("Step 3: About to upload image to Cloudinary.");
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        //console.log("Step 4: Image upload to Cloudinary successful.");

        //console.log("Step 5: About to parse courseData JSON.");
        const parsedCourseData = JSON.parse(courseData);
        //console.log("Step 6: JSON parsing successful.");

        parsedCourseData.educator = educatorId;
        parsedCourseData.courseThumbnail = imageUpload.secure_url;

        //console.log("Step 7: About to create course in the database.");
        const newCourse = await Course.create(parsedCourseData);
        //console.log("Step 8: Course creation in database successful.");

        res.json({ success: true, message: 'Course Added Successfully', course: newCourse });

    } catch (error) {
        // This block will catch any errors and log them
        //console.error("--- CATCH BLOCK ERROR ---");
        //console.error("The process crashed. Full error details below:");
        //console.error(error);
        
        res.status(500).json({ success: false, message: 'An internal server error occurred.' });
    }
}

// Get Educator Courses
export const getEducatorCourses = async (req, res) => {
    try {

        const {userId : educator} = req.auth();
        const courses = await Course.find({educator})
        res.json({success : true, courses});

    } catch (error) {
        res.json({success : false, message : error.message});
    }
}

// Get Educator Dashboard Data (Toal Earning , Enrolled Students, Total Courses)

export const educatorDashboardData = async (req, res) => {

    try {
        const {userId : educator} = req.auth();
        const courses = await Course.find({educator});
        const totalCourses = courses.length;
        const courseIds = courses.map((course) => course._id);

        // calculate total earning from purchases

        const purchases = await Purchase.find(
            {
                courseId : {$in : courseIds},
                status : 'completed'
            }
        )

        const totalEarning = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

        // collect unique enrolled student IDs with their course titles
        const enrolledStudentsData = []; 
        for(const course of courses){
            const students = await User.find(
                {
                    _id : {$in : course.enrolledStudents}
                }, 'name image'
            );

            students.forEach((student) => {
                enrolledStudentsData.push({
                    courseTitle : course.courseTitle,
                    student
                });
            });
        }

        res.json({success : true, dashboardData : {
            totalEarning, enrolledStudentsData, totalCourses
        }})

    } catch (error) {
        res.json({success : false, message : error.message})    
    }
}

// get enrolled students data with purchase data

export const getEnrolledStudentsData = async (req, res) => {

    try {
        const {userId : educator} = req.auth();
        const courses = await Course.find({educator});
        const courseIds = courses.map((course) => course._id);

        const purchases = await Purchase.find({
            courseId : {$in : courseIds},
            status : 'completed'
        }).populate('userId', 'name image').populate('courseId', 'courseTitle');

        const enrolledStudents = purchases.map((purchase) => ({
            student : purchase.userId,
            courseTitle : purchase.courseId.courseTitle,
            purchaseDate : purchase.createdAt
        }))

        res.json({success : true, enrolledStudents})

    } catch (error) {
        res.json({success : false, message : error.message})  
    }
}

