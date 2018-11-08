var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));
console.log("socket server is running");

var socket = require('socket.io');
var io = socket(server);

var players = [];

setInterval(heartbeat, 33);
 function heartbeat() {
   io.sockets.emit('heartbeat', players);
 }

function Player(x, y, id) {

  this.x = x;
  this.y = y;
  this.id = id
}

io.sockets.on('connection', newConnection)

function newConnection(socket) {

  console.log('new connection ');


  socket.on('start', start);
  socket.on('update', update);

  //start
  function start(data) {

    player = new Player(data.x, data.y, socket.id);
    players.push(player);
    console.log(players.length + ' players');
  }

  //update
  function update(data) {

    var playerToUpdate;

    for (var i = 0; i < players.length; i++){

      if(socket.id == players[i].id) {

        playerToUpdate = players[i];
      }
    }

    playerToUpdate.x = data.x;
    playerToUpdate.y = data.y;
  }
}
