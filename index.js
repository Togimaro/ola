var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 5000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

var users = [];

io.sockets.on('connection',
  function (socket) {

    socket.on('setPlayer',
      function(data) {
        console.log("New " + data.numPlayer + " player(s) at " + socket.id);
    
        users[socket.id] = { soc: socket, num: data.numPlayer };
      }
    );

    socket.on('prepare',
      function(data) {
        console.log("Received:s 'prepare' from " + socket.id);
      
        socket.broadcast.emit('prepare', socket.id);
      }
    );

    socket.on('ola',
      function(data) {
        console.log("Received:s 'ola' from " + socket.id);
      
        socket.broadcast.emit('ola', socket.id);
      }
    );
    
    socket.on('disconnect', function() {
      delete users[socket.id];
      console.log("Client has disconnected");
    });
  }
);