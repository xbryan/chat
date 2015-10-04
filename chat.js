var socket = io();

$('.sender').submit(function(event) {
  var message = {user: $('.username').val(), message: $('.message').val()};
  console.log(JSON.stringify(message));
  socket.emit('message', message);
  $('.message').val('');
  $('.messages').prepend(templateMessage(message));

  // Returning false nullifies default form behavior, which is good. 
  // It's similar to using event.preventDefault().
  return false; 
});

socket.on('message', function(message) {
  console.log('received message');
  console.log(JSON.stringify(message));
  $('.messages').prepend(templateMessage(message));
});

var templateMessage = function(message) {
  return '<div class="messageContainer">' +
    '<span class="messageUser">' + message.user +
    '</span>: ' +
    '<span class="messageContent">' + message.message +
    '</span>' +
  '</div>';
};
