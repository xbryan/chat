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
  // io.emit('loggedIn', {user: , id: });

  socket.on('disconnect', function(reason) {
    console.log('a user disconnected because:', reason);
  });

  socket.on('nameChange', function(name) {
    console.log('changing name');
    console.log(name);
    console.log(socket.conn.id);
    socket.broadcast.emit('nameChange', {
      name: name, 
      id: socket.conn.id
    });
  })

  socket.on('message', function(message) {
    console.log(socket.conn.id);
    console.log(message.user + ': ' + message.message);
    socket.broadcast.emit('message', message);
  });
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});
