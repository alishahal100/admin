import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'; // For the modal
import { Fragment } from 'react';

const TurfDetails = () => {
  const { id } = useParams();
  const [turf, setTurf] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turfResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/get-turf/${id}`);
        setTurf(turfResponse.data);
        const slotsResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/slots/${id}`);
        setSlots(slotsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!turf) {
    return <div className="text-center py-20">Turf not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">{turf.name}</h1>
        <p className="text-gray-500">{turf.location}</p>
      </div>

      {/* Buttons for Actions */}
      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md">
          Get Directions
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md">
          Call Now
        </button>
      </div>

      {/* Discounts */}
      <div className="flex overflow-x-auto space-x-4 mb-6">
        {/* {turf.discounts.map((discount, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg shadow-md"
          >
            {discount}
          </div>
        ))} */}
      </div>

      {/* Available Sports */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Available Sports</h2>
        <div className="flex space-x-4">
          {/* {turf.sports.map((sport, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow-sm"
            >
              {sport}
            </button>
          ))} */}
        </div>
      </div>

      {/* Venue Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Venue Info</h2>
        <p>{turf.description}</p>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Amenities</h2>
        <div className="flex flex-wrap gap-4">
          {turf.amenities.map((amenity, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-green-100 text-green-600 rounded-full shadow-sm"
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

      {/* Book Now Button */}
      <div className="text-center">
        <button
          onClick={openModal}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg font-bold"
        >
          Book Now
        </button>
      </div>

      {/* Modal for Slot Selection */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Select a Slot
                  </Dialog.Title>
                  <div className="mt-2">
                    {slots.map((slot, index) => (
                      <button
                        key={index}
                        className="block w-full px-4 py-2 mb-2 text-left bg-gray-100 rounded-lg"
                      >
                        {slot.startTime} - {slot.endTime} | ₹{slot.price} | {slot.status}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        closeModal();
                        alert('Proceeding to payment...');
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TurfDetails;
