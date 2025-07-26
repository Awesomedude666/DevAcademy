import React from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import { useContext } from 'react';
import CourseCard from './CourseCard';


function CoursesSection() {


  const {allCourses} = useContext(AppContext);



  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-300">Learn from the best</h2>
      <p className="text-sm md:text-base text-gray-300 mt-3">Explore expertly curated courses in Web Development, Data Structures, and Competitive Programming - <br/> designed to take you from beginner to job-ready.</p>

      <div className='grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-4 px-4 md:px-0 md:my-16 my-10'>
        {allCourses.slice(0,4).map((course, index) => <CourseCard key={index} course={course}/>)}
      </div>

      <Link to={'/courses-list'} onClick={() => scrollTo(0,0)} className="text-gray-300 border border-gray-500 px-10 py-3 rounded inline-block mt-3 hover:bg-gray-900">Show all courses</Link>


    </div>
  )
}

export default CoursesSection