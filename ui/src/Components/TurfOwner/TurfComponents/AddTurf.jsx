import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLoadScript } from "@react-google-maps/api";
import {jwtDecode} from "jwt-decode"; // Correct import for jwtDecode

const libraries = ["places"];


const InputField = ({ label, type, name, value, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        required={required}
      />
    )}
  </div>
);

const FileUpload = ({ label, accept, multiple, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={onChange}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
  </div>
);

const SlotField = ({ index, slot, handleSlotChange }) => (
  <>
    <div className="flex-grow">
      <InputField
        label={`Start Time (Slot ${index + 1})`}
        type="time"
        name="startTime"
        value={slot.startTime}
        onChange={(e) => handleSlotChange(index, e)}
        required
      />
    </div>
    <div className="flex-grow">
      <InputField
        label={`End Time (Slot ${index + 1})`}
        type="time"
        name="endTime"
        value={slot.endTime}
        onChange={(e) => handleSlotChange(index, e)}
        required
      />
    </div>
    <div className="flex-grow">
      <InputField
        label={`Price (Slot ${index + 1})`}
        type="number"
        name="price"
        value={slot.price}
        onChange={(e) => handleSlotChange(index, e)}
        required
      />
    </div>
  </>
);


const AddTurf = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amenities: "",
    pricePerHour: "",
    pricePerMonth: "",
    slots: [{ startTime: "", endTime: "", price: "" }],
    location: "", // Location will hold the full address
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).userId : null;

  useEffect(() => {
    if (isLoaded && !autocompleteRef.current && window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'in' },
      });
      autocompleteRef.current.addListener("place_changed", handlePlaceChanged);
    }

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Only update the specific field being typed into
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // Ensure that handlePlaceChanged only updates location and does not conflict with the rest of the form
  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.place_id) {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId: place.place_id }, (details, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const address = details.formatted_address;
            setFormData((prevData) => ({
              ...prevData,
              location: address,  // Only update the location
            }));
          } else {
            console.error('Error fetching place details:', status);
          }
        });
      }
    } else {
      console.error('Autocomplete is not initialized');
    }
  };
  

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === "images") {
      setImages([...images, ...files]);
    } else if (type === "videos") {
      setVideos([...videos, ...files]);
    }
  };

  const addSlot = () => {
    setFormData((prevData) => ({
      ...prevData,
      slots: [...prevData.slots, { startTime: "", endTime: "", price: "" }],
    }));
  };

  const handleSlotChange = (index, e) => {
    const updatedSlots = formData.slots.map((slot, i) =>
      i === index ? { ...slot, [e.target.name]: e.target.value } : slot
    );
    setFormData({ ...formData, slots: updatedSlots });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID is required.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "slots") {
        data.append(key, formData[key]);
      }
    });

    data.append("userId", userId);
    data.append("slots", JSON.stringify(formData.slots));
    images.forEach((image) => data.append("images", image));
    videos.forEach((video) => data.append("videos", video));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/add-turf`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Turf added successfully:", response.data);
    } catch (error) {
      console.error("Error adding turf:", error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="p-6 sm:p-10 bg-gray-100 h-screen flex flex-col">
      <h1 className="text-2xl lg:text-3xl text-center mb-6">Add New Turf</h1>

      <div className="flex-grow overflow-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-full lg:max-w-3xl mx-auto"
        >
          {/* Turf Name */}
          <InputField
            label="Turf Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          {/* Google Places Autocomplete for location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Search for location"
              value={formData.location}
              onChange={handleInputChange}
              ref={inputRef}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Other input fields */}
          <InputField
            label="Description"
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />

          <InputField
            label="Amenities (comma separated)"
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleInputChange}
            required
          />

          {/* File Uploads */}
          <FileUpload
            label="Upload Images"
            accept="image/*"
            multiple
            onChange={(e) => handleFileUpload(e, "images")}
          />

          <FileUpload
            label="Upload Videos"
            accept="video/*"
            multiple
            onChange={(e) => handleFileUpload(e, "videos")}
          />

          {/* Price Fields */}
          <InputField
            label="Price Per Hour"
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleInputChange}
            required
          />

          <InputField
            label="Monthly Subscription Price"
            type="number"
            name="pricePerMonth"
            value={formData.pricePerMonth}
            onChange={handleInputChange}
          />

          {/* Time Slots */}
          <h3 className="text-lg font-semibold mb-4">Time Slots</h3>
          {formData.slots.map((slot, index) => (
            <div key={index} className="flex space-x-4 mb-4">
              <SlotField
                index={index}
                slot={slot}
                handleSlotChange={handleSlotChange}
              />
            </div>
          ))}

          <button type="button" onClick={addSlot} className="text-blue-600 mb-4">
            Add Another Slot
          </button>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTurf;
