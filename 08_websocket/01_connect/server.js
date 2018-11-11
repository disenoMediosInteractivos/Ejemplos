var express = require('express');
var app = express(); //crea una app de express
var server = app.listen(3000); //inicia un servidor en el puerto 3000

 //muestra en la pagina los contenidos de la carpeta 'public'
app.use(express.static('public'));

console.log("socket server is running");


var socket = require('socket.io'); //importa la libreria express
var io = socket(server); //crea un servidor de socket.io

//cada vez que el servidor recibe una nueva conexión llama a la función newConnection
io.sockets.on('connection', newConnection)


function newConnection(socket) { //'socket' es la información del cliente que se conecto
  console.log('new connection ' + socket.id);

  //cuando recibe el mensaje 'mouse' ejecuta la función mouseMessage
  socket.on('mouse', mouseMessage);

  function mouseMessage(data) { //recibe lso datos del mouse del cliente

    //reenvia el mensaje con lso datos a todos los clientes excepto a quien envió el mensaje
    socket.broadcast.emit('mouse', data);
  }
}
