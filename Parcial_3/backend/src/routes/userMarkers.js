const express = require('express');
const { addMarker, getUserMarkers } = require('../controllers/userMarkerController');
const router = express.Router();

// Rutas para los marcadores
router.post('/add-marker', addMarker);
router.get('/user-markers', getUserMarkers);

module.exports = router;
