// models/UserMarker.js
const mongoose = require('mongoose');

const UserMarkerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    city: { type: String },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  imageUrl: { type: String }, // URL de la imagen subida
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserMarker', UserMarkerSchema);
