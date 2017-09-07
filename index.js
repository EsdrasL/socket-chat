const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    socket.broadcast.emit('connected', 'user connected');
    socket.on('chat message', (name, msg) => {
        socket.broadcast.emit('chat message', name, msg);
    });
    socket.on('disconnect', msg => {
        socket.broadcast.emit('disconnected', 'user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Listening on port: 3000');
});
