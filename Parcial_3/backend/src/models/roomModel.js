const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ownerEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, "Invalid email format"], // Validación básica de email
  },
  coordinates: {
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
