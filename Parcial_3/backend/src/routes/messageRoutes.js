const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

// Middleware para verificar token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Obtener mensajes del usuario autenticado
router.get('/', verifyToken, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ de: req.user.email }, { para: req.user.email }]
        }).sort({ stamp: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
});

// Obtener un mensaje por ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ error: 'Mensaje no encontrado' });
        res.json(message);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el mensaje' });
    }
});

// Enviar un mensaje
router.post('/', verifyToken, async (req, res) => {
    try {
        const { para, asunto, contenido, adjunto } = req.body;
        const newMessage = new Message({
            de: req.user.email,
            para,
            asunto,
            contenido,
            adjunto
        });
        await newMessage.save();
        res.json({ message: 'Mensaje enviado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});

// Responder a un mensaje
router.post('/:id/responder', verifyToken, async (req, res) => {
    try {
        const originalMessage = await Message.findById(req.params.id);
        if (!originalMessage) return res.status(404).json({ error: 'Mensaje original no encontrado' });
        
        const { contenido, adjunto } = req.body;
        const responseMessage = new Message({
            de: req.user.email,
            para: originalMessage.de,
            asunto: `Re: ${originalMessage.asunto}`,
            contenido,
            adjunto
        });
        await responseMessage.save();
        res.status(201).json(responseMessage);
    } catch (err) {
        res.status(500).json({ error: 'Error al responder el mensaje' });
    }
});

// Eliminar un mensaje
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ error: 'Mensaje no encontrado' });
        if (message.de !== req.user.email) return res.status(403).json({ error: 'No autorizado' });
        
        await message.deleteOne();
        res.json({ message: 'Mensaje eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el mensaje' });
    }
});

module.exports = router;
