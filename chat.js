// Emits a "connection" event to the server.
var socket = io();
$('.sender').submit(function(event) {
  var message = {user: $('.username').val(), message: $('.message').val()};
  console.log(JSON.stringify(message));
  socket.emit('message', message);
  $('.message').val('');

  // Returning false nullifies default form behavior, which is good. 
  // It's similar to using event.preventDefault().
  return false; 
});
