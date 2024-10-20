import React, { useState } from 'react';
import AddTurf from './AddTurf';

// Example components for each section
const ManageTurf = () => <div>Manage Turf Component</div>;
const ViewBookings = () => <div>View Bookings Component</div>;
const ViewReviews = () => <div>View Reviews Component</div>;
const ViewProfile = () => <div>View Profile Component</div>;

const Navbar = () => {
  const [selectedSection, setSelectedSection] = useState('addTurf'); // Default to AddTurf

  // Function to render the selected section
  const renderSection = () => {
    switch (selectedSection) {
      case 'addTurf':
        return <AddTurf />;
      case 'manageTurf':
        return <ManageTurf />;
      case 'viewBookings':
        return <ViewBookings />;
      case 'viewReviews':
        return <ViewReviews />;
      case 'viewProfile':
        return <ViewProfile />;
      default:
        return <AddTurf />;
    }
  };

  return (
    <div>
      {/* Button to open the menu on small devices */}
      <button
        className="lg:hidden p-4 text-white bg-gray-700 fixed top-4 left-4 z-50"
        onClick={() => setSelectedSection('menuOpen')}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-700 w-64 z-40 transform ${
          selectedSection === 'menuOpen' ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="container py-10">
          <h1 className="text-white text-3xl border-black-[3px] rounded-xl mb-8 text-center">
            Dashboard
          </h1>
          <nav className="flex flex-col text-white space-y-4">
            <button
              onClick={() => setSelectedSection('addTurf')}
              className="hover:text-gray-400"
            >
              Add Turf
            </button>
            <button
              onClick={() => setSelectedSection('manageTurf')}
              className="hover:text-gray-400"
            >
              Manage Turf
            </button>
            <button
              onClick={() => setSelectedSection('viewBookings')}
              className="hover:text-gray-400"
            >
              View Bookings
            </button>
            <button
              onClick={() => setSelectedSection('viewReviews')}
              className="hover:text-gray-400"
            >
              View Reviews
            </button>
            <button
              onClick={() => setSelectedSection('viewProfile')}
              className="hover:text-gray-400"
            >
              View Profile
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay for small devices when the menu is open */}
      {selectedSection === 'menuOpen' && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setSelectedSection('')}
        ></div>
      )}

      {/* Main content that will appear to the right of the navbar */}
      <div className="lg:ml-64 p-6">{renderSection()}</div>
    </div>
  );
};

export default Navbar;
