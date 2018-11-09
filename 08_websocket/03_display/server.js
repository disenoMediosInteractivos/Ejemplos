var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));
console.log("socket server is running");

var socket = require('socket.io');
var io = socket(server);

var display;
var players = [];

function Display(id) {
  this.id = id;
}

function Player(id) {
  this.velX = 1;
  this.velY = 0;
  this.id = id;
}

io.sockets.on('connection', newConnection)

function newConnection(socket) {

  console.log('new connection ');

  socket.on('start', start);
  socket.on('dir', dir);
  socket.on('disconnecting', disconnect);

  //start
  function start(data) {

    if (display == undefined) {

      display = new Display(socket.id);
      io.to(socket.id).emit('display', true);
      console.log ('display is set up');

    }

    if (display.id !== socket.id) {

      player = new Player(socket.id);
      players.push(player);
      console.log(players.length + ' players');
      io.sockets.emit('newPlayer', player);

    }
  }

  //change direciton
  function dir(data) {

    for (var i = 0; i < players.length; i++) {

      if(players[i] != undefined && socket.id == players[i].id) {

        if(data == "UP") {

          players[i].velX = 0;
          players[i].velY = -1;

        } else if (data == "DOWN") {
          players[i].velX = 0;
          players[i].velY = 1;

        } else if (data == "LEFT") {
          players[i].velX = -1;
          players[i].velY = 0;

        } else if (data == "RIGHT") {
          players[i].velX = 1;
          players[i].velY = 0;
        }

        data = {
          id: socket.id, 
          velX: players[i].velX,
          velY: players[i].velY
        };

        io.sockets.emit('change', data);

      }
    }
  }

  //disconnect
  function disconnect() {

    for (var i = 0; i < players.length; i++) {

      if ( players[i] != undefined && socket.id == players[i].id) {
        players.splice(i, 1);
      }
    }

    console.log(players.length + ' players');
  }
}
