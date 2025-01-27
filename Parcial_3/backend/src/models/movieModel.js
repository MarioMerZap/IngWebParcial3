const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  posterUri: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
