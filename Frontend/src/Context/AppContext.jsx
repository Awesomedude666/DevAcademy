import {createContext} from 'react';
import { dummyCourses } from '../assets/assets';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import {useAuth, useUser} from '@clerk/clerk-react';

export const AppContext = createContext();


export const AppContextProvider =  (props) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const { user } = useUser();
    const { getToken } = useAuth();



    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // fetch all courses
    const fetchAllCourses = async() => {
        setAllCourses(dummyCourses);
    }

    useEffect(() => {
        fetchAllCourses();
        fetchUserEnrolledCourses();
    },[]);

    // function to calculate average rating of a course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0;
        let totalRating = 0;
        course.courseRatings.forEach((rating) => {
            totalRating += rating.rating;
    })
        return (totalRating / course.courseRatings.length);
    }

    // function to calculate course chapter time

    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units : ["h", "m"]})
    } // lecture duration is stored in minutes. first converting it into seconds
    // so that humanizer can understand and then it will convert into h and m.

    // function to calculate course duration
    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.map((chapter) =>
            chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        )
        return humanizeDuration(time * 60 * 1000, {units : ["h", "m"]})
    }

    // function to calculate no of lectures in the course
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach((chapter) => {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    }

    // fetch user enrolled courses
    const fetchUserEnrolledCourses = async() => {
        setEnrolledCourses(dummyCourses);
    }

    const logToken = async() => {
        console.log(await getToken());
    }

    useEffect(() => {
        if(user){
            logToken();
        }
    },[user]) 


    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,
        enrolledCourses,
        fetchUserEnrolledCourses,






    }

    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )

}

