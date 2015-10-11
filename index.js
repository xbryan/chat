var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};

app.use(express.static(__dirname));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  users[socket.conn.id] = {name: 'unknown'};
  io.emit('users', users);

  socket.on('disconnect', function() {
    delete users[socket.conn.id];
    io.emit('users', users);
  });

  socket.on('nameChange', function(name) {
    users[socket.conn.id] = {name: name};
    io.emit('users', users);
  });

  socket.on('message', function(message) {
    console.log(socket.conn.id);
    console.log(message.user + ': ' + message.message);
    socket.broadcast.emit('message', message);
  });
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});
