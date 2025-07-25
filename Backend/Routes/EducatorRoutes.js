import express from 'express';
import { getEducatorCourses, updateRoleToEducator } from '../Controllers/EducatorController.js';
import upload from '../Configs/Multer.js';
import { protectEducator } from '../Middlewares/authMiddleware.js';
import { addCourse } from '../Controllers/EducatorController.js';
import { educatorDashboardData, getEnrolledStudentsData } from '../Controllers/EducatorController.js';

const educatorRouter = express.Router();

// Add Educator Role 
educatorRouter.get('/update-role',updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);
educatorRouter.get('/courses', protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);


export default educatorRouter;

