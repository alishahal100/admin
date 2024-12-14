// models/Slot.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  turfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turves',
    required: true
  },
  date: {
    type: Date,
    required: false
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'manual'],
    default: 'available'
  }
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);
