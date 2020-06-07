const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);
const io = require('socket.io')(server);
let users = [];

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
  
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

io.on('connection', (socket) => {
    socket.on('users', (currentUser) => {
        //Временное решение
        if(users.some(user => (user.socketId === socket.id || user.id === currentUser.id))) {
            if(users.some(user => user.name !== currentUser.name && user.id === currentUser.id)){
                const newUsers = users.map(user => {
                    if(user.name !== currentUser.name && user.id === currentUser.id) {
                        user.name = currentUser.name;
                    }
                    return user;
                })
                io.sockets.emit('users', newUsers)
            }else{
                io.sockets.emit('users', users)
            }
        } else {
            currentUser.socketId = socket.id;
            users.push(currentUser);
            io.sockets.emit('users', users);
        }
    });
    socket.on('sendMessage', (data) => {
        io.sockets.emit('sendMessage', data);
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.sockets.emit('users', users)
    })
});