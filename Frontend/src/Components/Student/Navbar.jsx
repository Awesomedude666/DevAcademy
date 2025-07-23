import React from 'react'
import {assets} from '../../assets/assets'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';

function Navbar() {

  const {navigate,isEducator, } = useContext(AppContext);

  const isCourseListPage = location.pathname.includes('/courses-list');

  const {openSignIn} = useClerk();
  const { user } = useUser();

  return (
    <div className={`flex items-center text-white justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-gray-950' : 'bg-black'}`}>
    <div onClick={() => navigate('/')}>
      <div className="font-medium text-3xl cursor-pointer">Dev<span className="inline-block font-medium text-3xl cursor-pointer text-blue-300">Academy</span></div>
    </div>

    <div className="hidden md:flex items-center gap-5 text-gray-200">
      <div className="flex items-center gap-5">
        {user && 
        <>
        <button onClick={() => {navigate('/educator')}} className='hover:text-blue-300 transition-colors duration-200'>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
        <Link to='/my-enrollments' className='hover:text-blue-300 transition-colors duration-200'>My Enrollments</Link>
        </>
        }
      </div>

      {user ? <UserButton/> :
      <button onClick={() => openSignIn()} className="bg-blue-500 text-gray-100 px-5 py-2 rounded-full cursor-pointer hover:bg-blue-600">Create Account</button>
    }

    </div>

    {/* For Phone Screens */}

    <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-200">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && 
          <>
          <button onClick={() => {navigate('/educator')}} className='hover:text-blue-300 transition-colors duration-200'>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
          <Link to='/my-enrollments' className='hover:text-blue-300 transition-colors duration-200'>My Enrollments</Link>
          </>
          }
        </div>
        {
          user ? <UserButton/> : <button onClick={() => {openSignIn()}}><img src={assets.user_icon} alt="" className="fill-white bg-white rounded-full" /></button>
        }
        

    </div>


    </div>
  )
}

export default Navbar