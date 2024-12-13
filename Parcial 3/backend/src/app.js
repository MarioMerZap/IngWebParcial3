require('dotenv').config();
const express = require('express');
const cors = require('cors');

const taskRouter = require('./routers/taskRouter');
const colaboradoresRouter = require('./routers/collaboratorRouter');
const cloudinaryRouter = require('./routers/cloudinaryRouter');
const userMarkerRoutes = require('./routes/userMarkers');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRouter);
app.use('/api/collaborators', colaboradoresRouter);
app.use('/api/cloudinary', cloudinaryRouter);


app.use('/api/markers', userMarkerRoutes);


module.exports = app;