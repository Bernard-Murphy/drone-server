const express = require('express');
const io = require('socket.io');
const http = require('http');

const app = express();

app.get('/test', (req, res) => res.status(200).json({
    success: true
}));

const server = http.createServer(app);

const droneController = io(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3050']
    }
});

droneController.on('connection', socket => {
    console.log('connected')
    socket.on('command', command => droneController.emit('command', command));
});

server.listen(5043, () => console.log('Server running on port 5043'));