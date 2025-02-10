const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    de: { type: String, required: true }, // ID del usuario que envía
    para: { type: String, required: true }, // ID del destinatario
    asunto: { type: String, required: true },
    contenido: { type: String, required: true },
    adjunto: { type: String, default: null }, // URL de la imagen adjunta
    token: { type: String, required: true }, // Token del usuario autenticado
    stamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
