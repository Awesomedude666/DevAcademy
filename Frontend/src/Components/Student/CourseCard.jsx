import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { Link } from 'react-router-dom';
import {assets} from '../../assets/assets';

function CourseCard({course}) {

  const {currency,calculateRating} = useContext(AppContext);


  return (
    <Link to={'course/' + course._id} onClick={() => scrollTo(0,0)}
     className="botder border-gray-500 pb-6 overflow-hidden rounded-lg">
      <img className="w-full" src={course.courseThumbnail} alt="" />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className='text-gray-200'>{course.educator.name}</p>
        <div className='flex items-center space-x-2'>
          <p>{calculateRating(course)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt=''
              className="w-3.5 h-3.5"/>
            ))}
          </div>
          <p className='text-gray-200'>{course.courseRatings.length}</p>
        </div>
        <p className='text-base font-semibold text-gray-200'>{currency}{(course.coursePrice - course.discount*course.coursePrice/100).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CourseCard