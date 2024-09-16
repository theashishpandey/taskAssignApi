require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
     cors: {
          origin: '*',  // Allow CORS from all origins
          methods: ['GET', 'POST']
     }
});

io.on('connection', (socket) => {
     console.log('New client connected');

     socket.on('disconnect', () => {
          console.log('Client disconnected');
     });
});

const { createTask } = require('./controllers/taskController')(io);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});
