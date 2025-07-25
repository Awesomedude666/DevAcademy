import express from 'express';
import { getAllCourses, getCourseById} from '../Controllers/CourseController.js';


const CourseRouter = express.Router();

CourseRouter.get('/all', getAllCourses);
CourseRouter.get('/:id', getCourseById);



export default CourseRouter;