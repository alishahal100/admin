import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const ManageTurf = () => {
  const [slot, setSlot] = useState(null);
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).userId : null;

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/turfs/owner/${userId}`
        );
        const data = await response.json();

        setSlot(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSlots();
  }, []);
  return (
    <div>
      <h1>Slots Available:</h1>

      <div>
        {slot &&
          slot.map((slot) => (
            <div key={slot._id}>
              <p>Slot ID: {slot._id}</p>
              <p>Start Time: {slot.startTime}</p>
              <p>End Time: {slot.endTime}</p>
              <p>Price: {slot.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageTurf;
