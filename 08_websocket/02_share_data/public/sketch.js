var socket; //variable para el socket

//dirección ip del dispositivo
var ip = "http://0.0.0.0:3000"; //reemplazar!

//variable para guardar los jugadores existentes
var players = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  //conectar el socket al servidor de la ip del dispositivo
  socket = io.connect(ip);

  //crea un jugador
  player = new Player(random(width), random(height));

  //guarda la posicion del jugador
  data = {
    x: player.x,
    y: player.y
  };

  //envia un mensaje al servidor con los datos del nuevo jugador
  socket.emit('start', data);

  //recibe  constantemente los datos del servidor
  socket.on('heartbeat', function(data){

    //recibe la información de los jugadores que existen y sus posiciones
    players = data;
  });
}

function draw(){
  background(0, 200, 0);

  //muestra y mueve al jugador
  player.mostrar();
  player.mover();

  //guarda la posicion del jugador
  data = {
    x: player.x,
    y: player.y
  };

  //envia la información actualizada del jugador al servidor
  socket.emit('update', data);

  //recorre la lista de jugadores existentes
  for( var i = 0; i < players.length; i++) {

    //Solo dibuja los jugadores que tengan un id distinto al propio
    //Para no dibujarse 2 veces
    if(players[i].id !== socket.id){

      fill(255);
      ellipse(players[i].x, players[i].y, 30, 30);
    }
  }
}

//funcion jugador
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.tam = 30;

  //Dibuja al jugador
  this.mostrar = function() {
    fill(0, 50, 0);
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //Mueve al jugador
  this.mover = function() {

    //Calcula la diferencia entre el mouse y la posicion del jugador
    var difX = mouseX - this.x;
    var difY = mouseY - this.y;

    //Mueve al jugador una fracción de la distancia con el mouse
    if(abs(difX) > 1.0) {
      this.x = this.x + difX/32.0;
    }
    if(abs(difY) > 1.0) {
      this.y = this.y + difY/32.0;
    }
  }
}
