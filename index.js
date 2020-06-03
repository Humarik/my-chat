const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);
const io = require('socket.io')(server);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
  
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

io.on('connection', (socket) => {
    socket.on('sendMessage', (data) => {
        io.sockets.emit('sendMessage', data);
    });
});