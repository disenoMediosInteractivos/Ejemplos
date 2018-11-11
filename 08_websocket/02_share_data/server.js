var express = require('express');
var app = express(); //crea una app de express
var server = app.listen(3000); //inicia un servidor en el puerto 3000

//muestra en la pagina los contenidos de la carpeta 'public'
app.use(express.static('public'));

console.log("socket server is running");

var socket = require('socket.io'); //importa la libreria express
var io = socket(server); //crea un servidor de socket.io

var players = []; // variable para guardar los jugadores

//cada 33 millisegundos se ejecuta la funcion heartbeat
setInterval(heartbeat, 33);

function heartbeat() {

  //envia a todos los clientes la informacion de los jugadores
 io.sockets.emit('heartbeat', players);
}

//funcion jugador
function Player(x, y, id) {
  this.x = x; //posicion en x
  this.y = y; //posicion en y
  this.id = id //identificacion
}

//cada vez que el servidor recibe una nueva conexión llama a la función newConnection
io.sockets.on('connection', newConnection)

function newConnection(socket) {

  console.log('new connection ');

  socket.on('start', start); //cuando recibe el mensaje 'start' ejecuta la función start
  socket.on('update', update); //cuando recibe el mensaje 'update' ejecuta la función update
  socket.on('disconnecting', disconnect); //cuando se desconeta un jugador ejecuta la función disconnect)

  //start
  function start(data) {

    //crea un nuevo jugador con los datos de posicion recibidos y el id del cliente
    player = new Player(data.x, data.y, socket.id);
    players.push(player); //agrega el jugador a la lista players
    console.log(players.length + ' players');
  }

  //update
  function update(data) { //data es la información enviada por el cliente

    //recorre la lista de jugadores
    for (var i = 0; i < players.length; i++){

      //busca al jugador que tenga la misma id del cliente y revisa que exista
      if(players[i] != undefined && socket.id == players[i].id) {

        //actualiza la posicion del jugador
        players[i].x = data.x;
        players[i].y = data.y;
      }
    }
  }

  //disconnect
  function disconnect() {

    //recorre la lista de jugadores
    for (var i = 0; i < players.length; i++){

      //busca al jugador que tenga la misma id del cliente y revisa que exista
      if(players[i] != undefined && socket.id == players[i].id) {

        //elimina al jugador de la lista players
        players.splice(i, 1);
      }
    }

    console.log(players.length + ' players');
  }
}
