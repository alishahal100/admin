import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const renderDropdownLinks = () => {
    if (decodedToken?.role === "admin") {
      return (
        <a
          href="/admin/dashboard"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Admin Dashboard
        </a>
      );
    } else if (decodedToken?.role === "seller") {
      return (
        <a
          href="/seller/dashboard"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Seller Dashboard
        </a>
      );
    }
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-16 h-auto py-5 w-screen bg-white text-black font-bold border-b border-gray-300">
      {/* Gameday title on the left */}
      <div className="text-black text-2xl font-extrabold uppercase">
        <h1 className="ml-4 md:ml-0">
          Gameday<span className="text-orange-500">.</span>
        </h1>
      </div>

      {/* Profile Image Icon */}
      <div className="relative mr-4 md:mr-0">
        <div className="w-6 h-6 cursor-pointer" onClick={handleDropdownToggle}>
          <img
            src="/profile_icon.png"
            alt="Profile Icon"
            className="w-6 h-6"
          />
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"> {/* Added z-50 here */}
            <div className="py-1">
              {token ? (
                <>
                  {renderDropdownLinks()}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/signin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign In
                  </a>
                  <a
                    href="/user/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
