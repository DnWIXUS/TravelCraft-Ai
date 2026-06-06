const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String },
  price: { type: Number },
  name: { type: String },
  phone: { type: String },
  guests: { type: Number, default: 1 },
  bookedAt: { type: Date, default: Date.now },
  days: { type: Number, default: 1 },
  status: { type: String, enum: ['pending','accepted','rejected'], default: 'pending' }
});

module.exports = mongoose.model('Booking', BookingSchema);
