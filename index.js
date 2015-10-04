var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function(reason) {
    console.log('a user disconnected because:', reason);
  });
  socket.on('message', function(message) {
    console.log(message.user + ': ' + message.message);
    io.emit('message', message);
  });
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});
