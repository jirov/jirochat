const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(3000, () => console.log('Server running on the port 3000'));

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

// Listen event connection
io.on('connection', (socket) => {
    console.log(`Socket connection ${socket.id}`);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    });
}
);