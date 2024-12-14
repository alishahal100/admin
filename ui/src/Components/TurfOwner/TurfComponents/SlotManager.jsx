// src/components/SlotManager.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Typography, Grid } from '@mui/material';

const SlotManager = ({ turfId }) => {
  const [slots, setSlots] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSlotId, setEditSlotId] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Fetch slots for the selected turf
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/slots/${turfId}`);
        setSlots(response.data);
        console.log("Fetched slots:", response.data); // Log data after it's fetched
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };

    if (turfId) {
      fetchSlots();
    } else {
      console.error("turfId is not provided");
    }
  }, [turfId]);

  // Add a new slot
  const onSubmit = (data) => {
    if (isEditing) {
      axios.put(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/slots/${editSlotId}`, data)
        .then(() => {
          setSlots(slots.map(slot => (slot._id === editSlotId ? { ...slot, ...data } : slot)));
          reset();
          setIsEditing(false);
        })
        .catch(err => console.error(err));
    } else {
      axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/slots/add`, { ...data, turfId })
        .then(res => setSlots([...slots, res.data.slot]))
        .catch(err => console.error(err));
    }
  };

  // Set slot for editing
  const handleEdit = (slot) => {
    reset(slot);
    setIsEditing(true);
    setEditSlotId(slot._id);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Slots</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
         
          <Grid item xs={12} sm={3}>
            <TextField
              label="Start Time"
              type="time"
              {...register('startTime', { required: true })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="End Time"
              type="time"
              {...register('endTime', { required: true })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select {...register('status')}>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="booked">Booked</MenuItem>
                <MenuItem value="manual">Manual Booking</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              {isEditing ? 'Update Slot' : 'Add Slot'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h6" gutterBottom>Available Slots</Typography>
      <Grid container spacing={2}>
        {slots.map(slot => (
          <Grid item xs={12} key={slot._id}>
            <Typography>
               {slot.startTime} - {slot.endTime} 
              <Button onClick={() => handleEdit(slot)} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                Edit
              </Button>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SlotManager;
