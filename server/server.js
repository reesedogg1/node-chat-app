const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.emit("newMessage", generateMessage('Admin','Welcome to the chat app.'));
  
  socket.broadcast.emit("newMessage", generateMessage('Admin', 'New user added'));
  
  socket.on('createMessage', (message, callback) => {
    console.log('Message: ', message);
    callback('This is from the server');
    io.emit('newMessage', generateMessage(message.from,message.text));
    
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.long));
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });  
});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
