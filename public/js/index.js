var socket = io();
socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('newMessage', function(newMessage){
  console.log("New message: ", newMessage);
  
  var li = jQuery('<li></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);
  
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  
  jQuery('#messages').append(li);
});
  

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  
  var messageTextbox =jQuery('[name=message]');
  
  socket.emit('createMessage', {
    from:'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation){
    return alert("Geolocation not supported by your browser");
  }
  
  locationButton.attr('disabled', 'disabled').text('Sending location...')
  
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
    
    locationButton.removeAttr('disabled').text('Send location');
  }, function() {
    alert("Unable to fecth location");
    locationButton.removeAttr('disabled').text('Send location');
  });
});


