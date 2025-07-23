import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Rating from '../../Components/Student/Rating';


function Player() {


  const {enrolledCourses, calculateChapterTime,} = useContext(AppContext);
  const {courseId} = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if(course._id === courseId){
        setCourseData(course);
      }
    }) 
  }

  useEffect(() => {
    getCourseData();
  },[enrolledCourses,courseId]);

  const toggleSection = (index) => {
    setOpenSection((prev) => {
      prev[index] = !prev[index];
      return { ...prev };
    })
  }



  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>

        {/* left column */}
        <div className='text-gray-100'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>

          <div className='pt-5'>
            {courseData && courseData.courseContent.map((chapter, chapindex) => (
              <div key={chapindex} className='border border-gray-500 bg-gray-800 mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-700 select-none'
                  onClick={() => toggleSection(chapindex)}
                >
                  <div className='flex items-center gap-2'>
                    <img
                      className={`transform transition-transform ${openSection[chapindex] ? 'rotate-180' : ''}`}
                      src={assets.down_arrow_icon} alt="" />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>

                <div className={`overflow-hidden transition-all duration-100 ${openSection[chapindex] ? 'max-h-96' : 'max-h-0'} `}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-300 border-t border-gray-500'>
                    {chapter.chapterContent.map((lecture, index) => (
                      <li className='flex items-start gap-2 py-1' key={index}>
                        <img
                          src={false ? assets.blue_tick_icon : assets.play_icon} alt="" className='w-4 h-4 mt-1' />
                        <div className='flex items-center justify-between w-full text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.lectureUrl && <p
                              onClick={() => setPlayerData({
                               ...lecture, chapter : chapindex + 1, lecture : index+1
                              })} // this spreads all properties of lecture and
                              // adds 2 new indices chapter and lecture and gives number to them.
                              // so that the player can identify which chapter and lecture is going on.
                              className='text-blue-500 cursor-pointer'>Watch</p>}
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

          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this Course : </h1>
            <Rating initialRating={0}/>
          </div>
        </div>



        {/* right column */}
        <div className='md:mt-10'>
          {
            playerData ? 
            <div>
              <YouTube videoId={playerData.lectureUrl.split('/').pop().split('?')[0]} 
              iframeClassName='w-full aspect-video' />
              <div className='flex justify-between items-center mt-1'>
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button className='text-blue-400'>{false ? 'Completed' : 'Mark Complete'}</button>
              </div>
            </div>
             :
            <img src={courseData ? courseData.courseThumbnail : null} alt="" /> 

          }
          
        </div>
      </div>
    </>
  )
}

export default Player