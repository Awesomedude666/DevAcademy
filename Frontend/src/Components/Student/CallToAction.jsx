import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

function CallToAction() {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-300 font-semibold">Start Your Dev Journey Today</h1>
      <p className="text-gray-200 sm:text-sm">Join thousands of learners and educators on our platform. Sign up now to access a wide range of courses and resources.</p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <Link to="/courses-list" className='px-10 py-3 rounded-md text-gray-100 bg-blue-600 hover:bg-blue-500 active:bg-blue-400'>Get Started</Link>
        <button className='flex items-center gap-2'>Learn more <img className='text-white' src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

export default CallToAction