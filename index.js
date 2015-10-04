var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(request, response) {
  response.send('<h1>Testing</h1>');
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});