const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
    console.log('Server running on 3000');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});