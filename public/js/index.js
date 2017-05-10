var socket = io();
socket.on('connect', function() {
  console.log('connected to server');
  
  socket.emit('createMessage', {
    from: "Bill",
    text: "Hello, its me"
  });
});

socket.on('newMessage', function(newMessgae){
  console.log("New message: ", newMessgae);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


