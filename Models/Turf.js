const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
  name: String,
  description: String,
  amenities: [String],
  pricePerHour: Number,
  pricePerMonth: Number,
  slots: [{ day: String, startTime: String, endTime: String, price: Number }],
  images: [String],
  videos: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true }, 
});

const Turf = mongoose.model('Turf', turfSchema);

module.exports = Turf;
