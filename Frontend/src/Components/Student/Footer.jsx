import React from 'react'

function Footer() {
  return (
    <footer className='bg-black w-full md:px-36 text-left mt-10 border-t border-white/30'>
      <div className='flex flex-col md:flex-row items-center px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h1 className="font-medium text-3xl cursor-pointer">Dev<span className="inline-block font-medium text-3xl cursor-pointer text-blue-300">Academy</span></h1>
          <p className='mt-6 text-center md:text-left text-sm text-gray-100'>Empowering future developers with hands-on coding, expert mentorship, and real-world projects. Join us to turn your passion into a profession.</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-gray-100 mb-5'>Company</h2>
          <ul className='text-gray-200 flex md:flex-col text-sm w-full justify-between md:space-y-2'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-gray-100 mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm text-gray-200'>The latest news, articles and resources, sent to your inbox weekly.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input className="border border-gray-200 text-gray-300 placeholder-gray-500 outline-none rounded px-2 text-sm w-64 h-9"type="email" placeholder='Enter your email'/>
            <button className='bg-blue-500 w-24 h-9 text-gray-100 rounded'>Subscribe</button>
          </div>
        </div>

      </div>
      <p className='py-4 text-center text-xs md:text-sm text-gray-100'>Copyright 2025 © DevAcademy. All Rights Reserved.</p>

    </footer>
  )
}

export default Footer