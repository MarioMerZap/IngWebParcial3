const Movie = require("../models/movieModel");

const movieController = {
  async getAll(req, res) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ message: "Error fetching movies", error });
    }
  },

  async getOne(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.status(200).json(movie);
    } catch (error) {
      console.error("Error fetching movie:", error);
      res.status(500).json({ message: "Error fetching movie", error });
    }
  },

  async create(req, res) {
    try {
      const { title, posterUri } = req.body;
  
      if (!title || !posterUri) {
        return res.status(400).json({ message: "Title and posterUri are required" });
      }
  
      // Valida el formato de la URL del póster
      const validUrl = /^(http|https):\/\/[^ "]+$/.test(posterUri);
      if (!validUrl) {
        return res.status(400).json({ message: "Invalid poster URL" });
      }
  
      const movie = new Movie({ title, posterUri });
      await movie.save();
      res.status(201).json(movie);
    } catch (error) {
      res.status(400).json({ message: "Error creating movie", error });
    }
  },

  async update(req, res) {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.status(200).json(movie);
    } catch (error) {
      console.error("Error updating movie:", error);
      res.status(400).json({ message: "Error updating movie", error });
    }
  },

  async delete(req, res) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      console.error("Error deleting movie:", error);
      res.status(500).json({ message: "Error deleting movie", error });
    }
  },

  async search(req, res) {
    try {
      const { title } = req.query;

      // Validar si el parámetro de búsqueda está presente
      if (!title) {
        return res
          .status(400)
          .json({ message: "The 'title' query parameter is required." });
      }

      // Buscar películas que coincidan parcialmente con el título (sin distinción de mayúsculas/minúsculas)
      const movies = await Movie.find({ title: new RegExp(title, "i") });
      res.status(200).json(movies);
    } catch (error) {
      console.error("Error searching for movies:", error);
      res.status(500).json({ message: "Error searching for movies", error });
    }
  },
};

module.exports = movieController;
