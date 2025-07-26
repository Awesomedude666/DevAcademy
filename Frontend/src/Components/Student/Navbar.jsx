import React from 'react'
import {assets} from '../../assets/assets'; // Adjust the path as necessary
import { Link, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Navbar() {

  const {navigate,isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);


  const location = useLocation();
  // Check if the current path includes '/courses-list'
  const isCourseListPage = location.pathname.includes('/courses-list');

  const {openSignIn} = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if(isEducator){
        navigate('/educator');
        return;
      }
      const token = await getToken();
      toast.info('Please wait, we are processing your request to become an educator...');
      // Make a request to the backend to update the user role
      const {data} = await axios.get(backendUrl + '/api/educator/update-role', {headers:{Authorization:`Bearer ${token}`}});

      if(data.success){
        setIsEducator(true);
        toast.success('You are now an educator!');
        navigate('/educator');
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className={`flex items-center text-white justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-gray-950' : 'bg-black'}`}>
    <div onClick={() => navigate('/')}>
      <div className="font-medium text-3xl cursor-pointer">Dev<span className="inline-block font-medium text-3xl cursor-pointer text-blue-300">Academy</span></div>
    </div>

    <div className="hidden md:flex items-center gap-5 text-gray-200">
      <div className="flex items-center gap-5">
        {user && 
        <>
        <button onClick={becomeEducator} className='hover:text-blue-300 transition-colors duration-200'>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
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
          <button onClick={becomeEducator} className='hover:text-blue-300 transition-colors duration-200'>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
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