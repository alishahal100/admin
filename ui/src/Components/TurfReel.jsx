import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const TurfReel = () => {
  const [turfs, setTurfs] = useState([]);
  const navigate = useNavigate();  // For navigation to the details page

  useEffect(() => {
    // Fetch turfs from the backend
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/get-turfs`);
        setTurfs(response.data);
      } catch (error) {
        console.error('Error fetching turfs:', error);
      }
    };

    fetchTurfs();
  }, []);

  const handleCardClick = (turfId) => {
    navigate(`/turf/${turfId}`);  // Navigate to the turf details page
  };

  return (
    <div className="turf-reel px-6 py-8 bg-gray-100">
      {turfs.length === 0 ? (
        <p className="text-center text-gray-600">No turfs available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {turfs.map((turf) => (
            <div 
              key={turf._id} 
              className="turf-card bg-white shadow-lg rounded-lg cursor-pointer overflow-hidden"
              onClick={() => handleCardClick(turf._id)}
            >
              <Swiper spaceBetween={10} slidesPerView={1} className="swiper-container">
                {turf.images.map((image, index) => (
                  <SwiperSlide key={`image-${index}`}>
                    <img
                      src={image}
                      alt={`Turf image ${index + 1}`}
                      className="w-full h-56 object-cover"
                    />
                  </SwiperSlide>
                ))}

                {turf.videos.map((video, index) => (
                  <SwiperSlide key={`video-${index}`}>
                    <video
                      controls
                      className="w-full h-56 object-cover"
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{turf.name}</h3>
                <h3 className="text-sm font-semibold text-gray-800">{turf.location}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TurfReel;
