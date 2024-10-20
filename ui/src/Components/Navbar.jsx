import React, { useState } from "react";

import {jwtDecode} from 'jwt-decode'
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");
  console.log("token:",token)
  const decodedToken = token ? jwtDecode(token) : null;
  console.log('Decoded Token:', decodedToken);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const renderDropdownLinks = () => {
    if (decodedToken?.role === "admin") { // assuming 1 is admin
      return (
        <>
          <a href="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Admin Dashboard
          </a>
        </>
      );
    } else if (decodedToken?.role === "seller") { // assuming 2 is seller
      return (
        <>
          <a href="/seller/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Seller Dashboard
          </a>
        </>
      );
    }
  };

  return (
    <div className="flex items-center justify-between px-16 shadow-black shadow-xl h-auto py-5 z-50 top-0 gap-5 fixed w-screen bg-white text-black font-bold">
      <div>
      <h1>Gameday</h1>
      </div>
      <div className="relative">
        <span className="cursor-pointer" onClick={handleDropdownToggle}>
          {token ? `Welcome, ${decodedToken?.username}` : (
            <div className="flex gap-1">
              <a href="/signin" className="text-blue-500">Sign In</a>
              <a href="/user/signup" className="text-blue-500">Sign Up</a>
            </div>
          )}
        </span>
        {dropdownOpen && (
          <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
            <div className="py-1">
              {renderDropdownLinks()}
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
