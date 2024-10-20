import React from 'react';

const AdminNavbar = ({ setSelectedSection }) => {
  return (
    <div className='w-screen py-5 px-10  shadow-black shadow-sm rounded-xl mt-5 flex justify-around bg-gray-800 text-white'>
      <button onClick={() => setSelectedSection('users')} className='hover:text-gray-300'>Users</button>
      <button onClick={() => setSelectedSection('turfs')} className='hover:text-gray-300'>Turfs</button>
      <button onClick={() => setSelectedSection('payment')} className='hover:text-gray-300'>Payment</button>
    </div>
  );
};

export default AdminNavbar;
