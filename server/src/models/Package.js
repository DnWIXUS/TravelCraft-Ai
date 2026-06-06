const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['domestic','international','custom'], default: 'custom' },
  price: { type: Number, default: 0 },
  description: { type: String },
  image: { type: String },
  vibe: { type: String },
  included: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', PackageSchema);
