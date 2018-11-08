var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));
console.log("socket server is running");

var socket = require('socket.io');
var io = socket(server);

var display;
var players = [];

setInterval(heartbeat, 33);

function heartbeat() {

 io.sockets.emit('heartbeat', players);
}

function Display(id) {
  this.id = id;
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
  socket.on('disconnecting', disconnect);

  //start
  function start(data) {

    if (display == undefined) {

      display = new Display(socket.id);

      io.to(socket.id).emit('display', true);
      console.log ('display is set up');

    }

    if (display.id !== socket.id) {

      socket.broadcast.emit('display', false);
      console.log ('first client');

      player = new Player(0, 0, socket.id);
      players.push(player);
      console.log(players.length + ' players');

    }
  }

  //update
  function update(data) {

    for (var i = 0; i < players.length; i++){

      if(players[i] != undefined && socket.id == players[i].id) {

        players[i].x = data.x;
        players[i].y = data.y;
      }
    }
  }

  //disconnect
  function disconnect() {

    for (var i = 0; i < players.length; i++){

      if(players[i] != undefined && socket.id == players[i].id) {
        players.splice(i, 1);
      }
    }

    console.log(players.length + ' players');
  }
}
