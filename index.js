var app = require('express')();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    io.emit('chat.message', 'A new user connected');
    
    socket.on('chat.message', function(message) {
        io.emit('chat.message', message);
    });
    
    socket.on('disconnect', function() {
        io.emit('chat.message', 'A user has disconnected');
    });
});