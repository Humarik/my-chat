const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.emit('connection', socket.id);

    socket.on('sendMessage', (data) => {
        console.log(data);
        socket.broadcast.emit('sendMessage', data);
    });
});