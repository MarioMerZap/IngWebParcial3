require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./src/routes/auth');
const messagesRoutes = require('./src/routes/messagerOUTES');
require('./src/config/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'process.env.VITE_URL', // Cambia esto según la URL de tu frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
  
  // O simplemente permitir todo (para desarrollo)
  app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.error('Database connection error:', error));

// Configuración de sesiones y Passport
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/messages', messagesRoutes); // CRUD de mensajes

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
