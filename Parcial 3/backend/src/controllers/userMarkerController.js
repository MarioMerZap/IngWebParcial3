const UserMarker = require('../models/userMarker');

exports.addMarker = async (req, res) => {
    try {
      const { email, country, city, lat, lon, imageUrl } = req.body;
      const marker = new UserMarker({
        email,
        location: { country, city, lat, lon },
        imageUrl, // Añadir la URL de la imagen si existe
      });
      await marker.save();
      res.status(201).json(marker);
    } catch (err) {
      res.status(500).json({ error: 'Error creating marker' });
    }
  };
  
  

// Obtener todos los marcadores de un usuario
exports.getUserMarkers = async (req, res) => {
  try {
    const { email } = req.query;
    const markers = await UserMarker.find({ email });
    res.status(200).json(markers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching markers' });
  }
};
