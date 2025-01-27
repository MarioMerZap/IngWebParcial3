const axios = require("axios");
const Room = require("../models/roomModel");

const roomController = {
  async getAll(req, res) {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Error fetching rooms", error });
    }
  },

  async getOne(req, res) {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) return res.status(404).json({ message: "Room not found" });
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ message: "Error fetching room", error });
    }
  },

  async create(req, res) {
    try {
      const { name, ownerEmail, address } = req.body;

      if (!name || !ownerEmail || !address) {
        return res.status(400).json({
          message: "The 'name', 'ownerEmail', and 'address' fields are required.",
        });
      }

      // Llamada a OpenStreetMap para obtener las coordenadas
      const geocodingUrl = `https://nominatim.openstreetmap.org/search`;
      const params = {
        q: address,
        format: "json",
        limit: 1,
      };

      const response = await axios.get(geocodingUrl, { params });

      if (response.data.length === 0) {
        return res.status(404).json({ message: "Address not found" });
      }

      const { lat, lon } = response.data[0];
      const coordinates = { latitude: parseFloat(lat), longitude: parseFloat(lon) };

      // Crear la sala con las coordenadas obtenidas
      const room = new Room({
        name,
        ownerEmail,
        address,
        coordinates,
      });

      await room.save();
      res.status(201).json(room);
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(400).json({ message: "Error creating room", error });
    }
  },

  async update(req, res) {
    try {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!room) return res.status(404).json({ message: "Room not found" });
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ message: "Error updating room", error });
    }
  },

  async delete(req, res) {
    try {
      const room = await Room.findByIdAndDelete(req.params.id);
      if (!room) return res.status(404).json({ message: "Room not found" });
      res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting room", error });
    }
  },
};

module.exports = roomController;
