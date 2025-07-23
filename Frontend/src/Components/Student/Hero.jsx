import React from 'react'
import { assets } from '../../assets/assets';
import Searchbar from './Searchbar';

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center">
      <h1 className="md:text-3xl text-base  relative font-medium text-gray-100 max-w-3xl mx-auto">Full Stack Meets Fast Algorithms-<span className="text-blue-300">In One Platform</span>
      <img src={assets.sketch} alt="sketch" className="md:block hidden absolute -bottom-7 right-0"/>
      </h1>

      <p className="md:block hidden text-md text-gray-300 max-w-2xl mx-auto">DevAcademy combines hands-on dev learning with CP practice to turn students into job-ready developers.</p>
      {/* For mobile Screen */}
      <p className="md:hidden text-gray-300 max-w-sm mx-auto">DevAcademy combines hands-on dev learning with CP practice to turn students into job-ready developers.</p>

      <Searchbar />
      


    </div>
  )
}

export default Hero