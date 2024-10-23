import React from 'react';

const Banner = () => {
  return (
    <div 
      className='h-[75vh] sm:h-screen w-screen flex flex-col justify-center items-start bg-cover bg-center relative' 
      style={{ backgroundImage: 'url(/ban8.jpg)' }}
    >
      {/* Gradient overlay for large screens only */}
      <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent w-full hidden sm:block' />

      {/* Heading, left-aligned on large screens, centered on small screens */}
      <h1 className='text-4xl sm:text-5xl text-white font-extrabold z-10 mb-4 ml-24 sm:ml-40 text-center sm:text-left'>
        NEVER STOP<br />PLAYING
      </h1>

      {/* Button, centered on small screens, left-aligned on large screens */}
      <a href="/booking" className='bg-black text-white text-lg font-bold py-3 px-6 rounded shadow-md z-10 ml-32 sm:ml-40 text-center sm:text-left'>
        BOOK NOW
      </a>
    </div>
  );
};

export default Banner;
