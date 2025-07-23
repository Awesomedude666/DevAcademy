import React from 'react'

function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin'></div>
      <div className='md:text-4xl text-3xl text-gray-100'>Loading...</div>
      </div>
    </div>
  )
}

export default Loading