var express = require('express');
var app = express(); //crea una app de express
var server = app.listen(3000); //inicia un servidor en el puerto 3000

//muestra en la pagina los contenidos de la carpeta 'public'
app.use(express.static('public'));

console.log("socket server is running");

var socket = require('socket.io'); //importa la libreria express
var io = socket(server); //crea un servidor de socket.io

var display; //variable para gaurdar al información del display
var players = []; // variable para guardar los jugadores

//funcion display
function Display(id) {
  this.id = id;
}

//funcion jugador
function Player(id) {
  this.velX = 1;
  this.velY = 0;
  this.id = id;
}

//cada vez que el servidor recibe una nueva conexión llama a la función newConnection
io.sockets.on('connection', newConnection);

function newConnection(socket) {

  socket.on('start', start); //cuando recibe el mensaje 'start' ejecuta la función start
  socket.on('dir', dir); //cuando recibe el mensaje 'dir' ejecuta la función dir
  socket.on('disconnecting', disconnect); //cuando se desconeta un jugador ejecuta la función disconnect


  //start
  function start(data) {

    //si el display no existe aun
    if (display == undefined) {

      //asigna al primer cliente conectado la funcion de ser el display del juego
      display = new Display(socket.id);
      io.to(socket.id).emit('display', true); //envia al cliente el mensaje display diciendole que es el display
      console.log('display is setup :)');

    //si el display ya ha sido seleccionado
    } else if (display.id !== socket.id) {

      player = new Player(socket.id); //crea un nuevo jugador
      players.push(player); //lo agrega a la lista de jugadores
      io.sockets.emit('newPlayer', player);

      console.log(players.length + ' players');
    }
  }

  //Cambio de dirección, cuando un jugador orpimio un boton de direccion
  function dir(data) { //data es la direccion del botón orpimido

    //recorre la lista de jugadores
    for (var i = 0; i < players.length; i++) {

      //busca al jugador que tenga la misma id del cliente y revisa que exista
      if(players[i] != undefined && socket.id == players[i].id) {

        //dependiendo del boton oprimido actualiza la dirección del jugador
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

        //guarda la nueva direccion y el id del jugador
        data = {
          id: socket.id,
          velX: players[i].velX,
          velY: players[i].velY

        };

        //envia la información a todos (pero solo el display la utilizara)
        io.sockets.emit('update', data);

      }
    }
  }

  //disconnect
  function disconnect() {

    //recorre la lista de jugadores
    for (var i = 0; i < players.length; i++) {

      //busca al jugador que tenga la misma id del cliente y revisa que exista
      if (players[i] != undefined && socket.id == players[i].id) {

        //envia un mensaje para que el diplay elimine al jugador
        io.sockets.emit('deletePlayer', players[i]);

        players.splice(i, 1); //elimina al jugador de la lista players

      }
    }

    //Si el que se desconecta es el display
    if (display != undefined && socket.id == display.id) {

      console.log('display disconnected');
      server.close(); //cierra el servidor

    }

    console.log(players.length + ' players');
  }
}
