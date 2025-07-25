import User from '../Models/User.js';
import Course from '../Models/Course.js';
import Purchase from '../Models/Purchase.js';
import Stripe from 'stripe';
import CourseProgress from '../Models/CourseProgress.js';

export const getUserData = async (req, res) => {

    try {

        const { userId } = req.auth();
        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// User enrolled courses with lecture links.

export const userEnrolledCourses = async (req, res) => {

    try {
        const { userId } = req.auth();
        const userData = await User.findById(userId).populate('enrolledCourses')

        res.json({ success: true, enrolledCourses: userData.enrolledCourses });

    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}


// Function to purchase a course
// This function will be called when the user clicks on the purchase button in the frontend.
export const purchaseCourse = async (req, res) => {

    try {

        const { courseId } = req.body;
        const { origin } = req.headers;
        const { userId } = req.auth();
        const userData = await User.findById(userId);
        const courseData = await Course.findById(courseId)

        if (!userData || !courseData) {
            return res.json({ success: false, message: 'Data not found' });
        }

        const purchaseData = {
            courseId: courseData._id,
            userId, // we can use both the notation, userId or userData._id
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2),
        }

        const newPurchase = await Purchase.create(purchaseData);

        // stripe gateway initializing : 

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

        const currency = process.env.CURRENCY.toLowerCase();

        // creating line items for stripe

        const line_items = [
            {
                price_data: {
                    currency,
                    product_data: {
                        name: courseData.courseTitle,
                    },
                    unit_amount: Math.floor(newPurchase.amount) * 100,
                },
                quantity: 1
            }
        ]

        const session = await stripeInstance.checkout.sessions.create(
            {
                success_url: `${origin}/loading/my-enrollments`,
                cancel_url: `${origin}/`,
                line_items: line_items,
                mode: 'payment',
                metadata: {
                    purchaseId: newPurchase._id.toString(),
                }
            }
        )

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// update user course progress

export const updateUserCourseProgress = async (req, res) => {

    try {
        const { userId } = req.auth();
        const { courseId, lectureId } = req.body;
        const progressData = await CourseProgress.findOne({ userId, courseId });

        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({ success: true, message: 'Lecture already completed' });
            }

            progressData.lectureCompleted.push(lectureId);
            await progressData.save();
        }
        else {
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId],
            })
        }

        res.json({ success: true, message: 'Lecture progress updated successfully' });


    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// get user course progress

export const getUserCourseProgress = async (req, res) => {

    try {

        const { userId } = req.auth()
        const { courseId, lectureId } = req.body;
        const progressData = await CourseProgress.findOne({ userId, courseId });

        res.json({ success: true, progressData });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Add User Rating to Course

export const addUserRating = async (req, res) => {


    const { userId } = req.auth();
    const { courseId, rating } = req.body;

    if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
        return res.json({ success: false, message: 'Invalid data' });
    }

    try {
        const course = await Course.findById(courseId);

        if(!course){
            return res.json({success : false, message : 'Course not found'});
        }

        const user = await User.findById(userId);
        if(!user || !user.enrolledCourses.includes(courseId)){
            return res.json({success : false, message : 'User has not enrolled in this course'});
        }

        // Check if the user has already rated the course
        const existingRatingIndex = course.courseRatings.findIndex((rating) => rating.userId === userId);

        if(existingRatingIndex !== -1) {
            // Update the existing rating
            course.courseRatings[existingRatingIndex].rating = rating;
        }
        else{
            course.courseRatings.push({
                userId,
                rating
            })
        }

        await course.save();
        res.json({success : true, message : 'Rating added'})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}