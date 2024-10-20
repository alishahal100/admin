import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const TurfDetails = ({ match }) => {
  const {id} = useParams()
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response = await axios.get( `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/get-turf/${id}`);
        setTurf(response.data);
      } catch (error) {
        console.error('Error fetching turf details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!turf) {
    return <div className="text-center py-20">Turf not found.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center">{turf.name}</h1>
      <p className="text-gray-600 text-center mb-4">{turf.location}</p>
      <div className="flex justify-center mb-4">
        <img src={turf.images[0]} alt={turf.name} className="rounded-lg shadow-md w-full max-w-lg" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p className="text-gray-700 mb-4">{turf.description}</p>
      <h2 className="text-xl font-semibold mb-2">Amenities</h2>
      <ul className="list-disc list-inside mb-4">
        {turf.amenities.map((amenity, index) => (
          <li key={index} className="text-gray-700">{amenity}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Pricing</h2>
      <p className="text-gray-700">Price per hour: ₹{turf.pricePerHour}</p>
      <p className="text-gray-700">Price per month: ₹{turf.pricePerMonth}</p>
      <h2 className="text-xl font-semibold mb-2">Available Slots</h2>
      <ul className="list-disc list-inside mb-4">
        {turf.slots.map((slot, index) => (
          <li key={index} className="text-gray-700">{slot.startTime} - {slot.endTime} (₹{slot.price})</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Videos</h2>
      <div className="flex justify-center mb-4">
        {turf.videos.map((video, index) => (
          <video key={index} controls className="rounded-lg shadow-md w-full max-w-lg">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </div>
  );
};

export default TurfDetails;
