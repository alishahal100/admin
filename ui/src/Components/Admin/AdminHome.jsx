import React from 'react'
import AdminNavbar from './AdminNavbar'
import { useState,useEffect } from 'react'
import axios from 'axios'


const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token:", token);
        axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/get-users`, {
            headers: {
                Authorization: `Bearer ${token}` // Assuming you're storing the token in localStorage
            }
        })
        .then(response => {
            setUsers(response.data); // Set the users state with the fetched data
        })
        .catch(error => {
            console.error('Error fetching users:', error); // Handle any errors
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8 px-10">
            <h1 className="lg:text-3xl font-semibold text-center text-gray-800 mb-6">Users</h1>
            <div className="bg-white shadow-lg rounded-lg">
                <ul className="space-y-4">
                    {users.map(user => (
                        <li key={user._id} className="flex justify-between items-center p-4  bg-gray-50 rounded-lg shadow-sm">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                                    {user.username[0].toUpperCase()}
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-lg font-medium text-gray-700">{user.name}</h2>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                    <p className="text-sm text-gray-500">{user.role}</p>
                                </div>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};



const AdminHome = () => {
    const [selectedSection, setSelectedSection] = useState('users');

  return (
    <div className=' px-2'>
      <AdminNavbar setSelectedSection={setSelectedSection}/>
      <div className='mt-10 px-10'>
        {selectedSection === 'users' && <Users />}
        {/* {selectedSection === 'turfs' && <Turfs />}
        {selectedSection === 'payment' && <Payment />} */}
      </div>
    </div>
  )
}

export default AdminHome
