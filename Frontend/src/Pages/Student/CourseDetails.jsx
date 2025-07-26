import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import Loading from '../../Components/Student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../Components/Student/Footer';
import YouTube from 'react-youtube';
import axios from 'axios';
import { toast } from 'react-toastify';


function CourseDetails() {

  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);


  const { allCourses, calculateRating, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime, currency, backendUrl, userData, getToken } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/course/' + id)
      if(data.success){
        setCourseData(data.courseData);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const enrollCourse = async() => {
    try {
      if(!userData){
        return toast.warn('Login to Enroll')
      }

      if(isAlreadyEnrolled){
        return toast.warn('You are already enrolled in this course');
      }

      const token = await getToken();
      const {data} = await axios.post(backendUrl + '/api/user/purchase', {courseId: courseData._id}, {headers: {Authorization: `Bearer ${token}`}});

      if(data.success){
        const {session_url} = data
        window.location.href = session_url
      }
      else{
        toast.error(data.message);
      }
 
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchCourseData();
  }, [])

  useEffect(() => {
    if(userData && courseData){
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData])

  const toggleSection = (index) => {
    setOpenSection((prev) => {
      prev[index] = !prev[index];
      return { ...prev };
    })
  } // prev is previous state object. 
  // we directly toggle the value at prev[index]
  // we return a new object using {...prev} to trigger re-render.


  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">


        {/* left column */}
        <div className='max-w-xl z-10 text-gray-100'>
          <h1 className="text-3xl text-medium text-gray-100">{courseData.courseTitle}</h1>
          <p className="text-gray-200 md:text-base text-sm pt-4" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>


          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <p>{calculateRating(courseData)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt=''
                  className="w-3.5 h-3.5" />
              ))}
            </div>
            <p className='text-gray-200'>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? ' ratings' : ' rating'})</p>
            <p>{courseData?.enrolledStudents?.length || 0} {courseData?.enrolledStudents?.length > 1 ? ' students' : ' student'}</p>
          </div>

          <p className='text-sm'>Course by <span className='underline text-blue-400'>{courseData.educator.name}</span></p>

          <div className='pt-8 text-gray-300'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>

            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border border-gray-500 bg-gray-800 mb-2 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-700 select-none'
                    onClick={() => toggleSection(index)}
                  >
                    <div className='flex items-center gap-2'>
                      <img
                        className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`}
                        src={assets.down_arrow_icon} alt="" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                  </div>

                  <div className={`overflow-hidden transition-all duration-100 ${openSection[index] ? 'max-h-96' : 'max-h-0'} `}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-300 border-t border-gray-500'>
                      {chapter.chapterContent.map((lecture, index) => (
                        <li className='flex items-start gap-2 py-1' key={index}>
                          <img
                            src={assets.play_icon} alt="" className='w-4 h-4 mt-1' />
                          <div className='flex items-center justify-between w-full text-xs md:text-default'>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.isPreviewFree && <p
                                onClick={() => setPlayerData({
                                  videoId: lecture.lectureUrl.split('/').pop().split('?')[0],
                                })}
                                className='text-blue-500 cursor-pointer'>Preview</p>}
                              <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}

            </div>






            

          </div>

          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-200'>
              Course Description
            </h3>
            <p className="pt-3 text-gray-400" dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
          </div>

        </div>



        {/* right column */}
        <div className='max-w-[424px] z-10 shadow-lg rounded-t md:rounded-none overflow-hidden bg-gray-800 min-w-[300px] sm:min-w-[420px]'>

          {
            playerData ?
              <YouTube videoId={playerData.videoId} opts={{
                playerVars: {
                  autoplay: 1,
                }
              }} iframeClassName='w-full aspect-video' />
              
              : <img src={courseData.courseThumbnail} alt="courseThumbnail" />
          }

          <div className='p-5'>
            <div className='flex items-center gap-2'>


              <img className='w-3.5' src={assets.time_left_clock_icon} alt="time_left_clock_icon" />
              <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price</p>
            </div>

            <div className='flex items-center gap-3 pt-2'>
              <p className='text-gray-200 md:text-4xl text-2xl font-semibold'>{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
              <p className='md:text-lg text-gray-200 line-through'>{currency}{courseData.coursePrice}</p>
              <p className='md:text-lg text-gray-200'>{courseData.discount}%off</p>
            </div>
          </div>

          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-200'>
            <div className='flex items-center gap-1'>
              <img src={assets.star} alt="" />
              <p>{calculateRating(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-400'></div>

            <div className='flex items-center gap-1'>
              <img src={assets.time_clock_icon} alt="" />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-400'></div>

            <div className='flex items-center gap-1'>
              <img src={assets.lesson_icon} alt="" />
              <p>{calculateNoOfLectures(courseData)} lectures</p>
            </div>

          </div>

          <button onClick={enrollCourse} className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-gray-100 font-medium hover:bg-blue-500 active:bg-blue-400'>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>

          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-200'>What's in the course?</p>
            <ul className='list-disc ml-4 pt-2 text-sm md:text-default text-gray-300'>
              <li>Lifetime access with free updates</li>
              <li>Step-by-step, hands on project guidance</li>
              <li>Downloadable resources with source files</li>
              <li>Quizzes and assignments to test your skills</li>
              <li>Certificate of completion</li>
            </ul>
          </div>

        </div>


      </div>
      
    </>
  ) : <Loading />
}

export default CourseDetails