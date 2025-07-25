import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './Configs/Mongodb.js';
import { clerkWebhooks, stripeWebhooks } from './Controllers/Webhooks.js';
import educatorRouter from './Routes/EducatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './Configs/Cloudinary.js';
import CourseRouter from './Routes/CourseRoutes.js';
import userRouter from './Routes/UserRoutes.js';


// Initialize express app
const app = express();

// connect to MongoDB (asynchronously)
await connectDB();
// connect to Cloudinary (asynchronously)
await connectCloudinary();

// middleware
app.use(cors());
app.use(clerkMiddleware());



// Routes
app.get('/', (req, res) => res.send('API Working'));
app.post('/clerk', express.json(), clerkWebhooks);
app.use('/api/educator', express.json(), educatorRouter);
app.use('/api/course', express.json(), CourseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);



// port 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
