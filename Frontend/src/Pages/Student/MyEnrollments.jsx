import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import {Line} from 'rc-progress'

function MyEnrollments() {

  const {enrolledCourses,calculateCourseDuration,navigate} = useContext(AppContext)

  const [progressArray, setProgressArray] = useState([
    {lecturesCompleted: 4, totalLectures: 10},
    {lecturesCompleted: 2, totalLectures: 10},
    {lecturesCompleted: 10, totalLectures: 10},
    {lecturesCompleted: 8, totalLectures: 10},
  ])



  return (
    <>
    <div className='md:px-36 px-8 pt-10'>
      <h1 className='text-2xl font-semibold text-gray-200'>MyEnrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead>
          <tr>
            <th className='px-4 py-3 font-semibold truncate text-gray-300'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate text-gray-300'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate text-gray-300'>Course</th>
            <th className='px-4 py-3 font-semibold truncate text-gray-300'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-200'>
          {enrolledCourses.map((course,index) => (
            <tr key={index} className='border-b border-gray-500'>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28'/>
                <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index] ? 
                    (progressArray[index].lecturesCompleted / progressArray[index].totalLectures) * 100 : 0
                  } className='bg-gray-300 rounded-full'/>
                </div>
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {calculateCourseDuration(course)}
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {progressArray[index] && `${progressArray[index].lecturesCompleted} / ${progressArray[index].totalLectures}`} <span>Lectures</span>
              </td>
              <td className='px-4 py-3 max-sm:text-right'>
                <button onClick={() => {navigate('/player/' + course._id)}} className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-500 max-sm:text-xs text-gray-100'>
                  {progressArray[index] && progressArray[index].lecturesCompleted / progressArray[index].totalLectures === 1 ?
                    'Completed' : 'Ongoing'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default MyEnrollments