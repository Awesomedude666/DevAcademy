import React, { useContext } from 'react'
import { dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

function Navbar() {

  const educatorData = dummyEducatorData;
  const { user } = useUser();
  const { navigate } = useContext(AppContext)


  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <div onClick={() => navigate('/')}>
        <div className="font-medium text-3xl cursor-pointer">Dev<span className="inline-block font-medium text-3xl cursor-pointer text-blue-300">Academy</span></div>
      </div>

      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi ! {user ? user.fullName : 'Educator'}</p>
        {user ? <UserButton/> : <img src={assets.profile_img} alt="" className='max-w-8' /> }
      </div>
    </div>
  )
}

export default Navbar