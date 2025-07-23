import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t border-gray-500">
      <div className='flex items-center gap-4'>
        <div className="font-medium text-3xl cursor-pointer">Dev<span className="inline-block font-medium text-3xl cursor-pointer text-blue-300">Academy</span></div>
        <div className='hidden md:block h-7 w-px bg-gray-400'></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-300">
          Copyright 2025 © DevAcademy. All Rights Reserved.
        </p>
      </div>
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook_icon" className='bg-gray-100 rounded-full'/>
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="twitter_icon" className='bg-gray-200 rounded-full'/>
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="instagram_icon" className='bg-gray-200 rounded-full' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;