const Projection = require("../models/projectionModel");
const Movie = require("../models/movieModel");
const Room = require("../models/roomModel");

const projectionController = {
  async create(req, res) {
    try {
      const { movieTitle, roomName, timestamp } = req.body;

      // Buscar película y sala por título/nombre
      const movie = await Movie.findOne({ title: movieTitle });
      if (!movie) return res.status(404).json({ message: "Movie not found" });

      const room = await Room.findOne({ name: roomName });
      if (!room) return res.status(404).json({ message: "Room not found" });

      // Crear proyección
      const projection = new Projection({
        movie: movie._id,
        room: room._id,
        timestamp,
      });
      await projection.save();

      res.status(201).json(projection);
    } catch (error) {
      res.status(400).json({ message: "Error creating projection", error });
    }
  },

  async search(req, res) {
    try {
      const { movieTitle } = req.query;

      const movie = await Movie.findOne({ title: movieTitle });
      if (!movie) return res.status(404).json({ message: "Movie not found" });

      const projections = await Projection.find({ movie: movie._id }).populate("room");
      res.status(200).json({
        movie,
        projections,
      });
    } catch (error) {
      res.status(500).json({ message: "Error searching projections", error });
    }
  },
};

module.exports = projectionController;
