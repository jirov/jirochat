const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(process.env.PORT || 3000, () => console.log('Server running on the port 3000'));

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

var users = [];
var connections = [];

// Listen event connection
io.on('connection', (socket) => {
    connections.push(socket);
    console.log(`${connections.length} persons has connected!`);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    // Disconnect
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        users.splice(users.indexOf(socket.username),1);
        console.log(users);
        io.sockets.emit('newuser',users);
        console.log(`${connections.length} persons has connected!`);
    });

    socket.on('newuser', (data) => {
        socket.username = data;
        users.push(data);
        io.sockets.emit('newuser',users);
    });
});