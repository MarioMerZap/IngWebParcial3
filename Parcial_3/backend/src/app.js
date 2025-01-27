require('dotenv').config();
const express = require('express');
const cors = require('cors');

const taskRouter = require('./routers/taskRouter');
const colaboradoresRouter = require('./routers/collaboratorRouter');
const cloudinaryRouter = require('./routers/cloudinaryRouter');
const userMarkerRoutes = require('./routes/userMarkers');

const movieRouter = require('./routes/movieRouter');
const roomRouter = require('./routes/roomRouter'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRouter);
app.use('/api/collaborators', colaboradoresRouter);
app.use('/api/cloudinary', cloudinaryRouter);


app.use('/api/markers', userMarkerRoutes);

app.use('/api/movies', movieRouter);
app.use('/api/room', roomRouter);


const projectionRouter = require("./routes/projectionRouter");
app.use('/api/projections', projectionRouter);


module.exports = app;
