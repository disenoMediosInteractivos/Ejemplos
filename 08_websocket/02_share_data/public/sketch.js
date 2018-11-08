var socket;
var players = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  socket = io.connect("http://0.0.0.0:3000");

  player = new Player(random(width), random(height));

  data = {
    x: player.x,
    y: player.y
  };

  socket.emit('start', data);

  socket.on('heartbeat', function(data){
    players = data;
  });
}

function draw(){
  background(0, 200, 0);
  player.mostrar();
  player.mover();

  data = {
    x: player.x,
    y: player.y
  };

  socket.emit('update', data);

  for( var i = 0; i < players.length; i++) {

    if(players[i].id !== socket.id){

      fill(255);
      ellipse(players[i].x, players[i].y, 30, 30);
    }
  }
}

function Player(x, y) {
  this.x = x;
  this.y = y;
  this.tam = 30;

  this.mostrar = function() {
    fill(0, 50, 0);
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  this.mover = function() {
    var difX = mouseX - this.x;
    var difY = mouseY - this.y;

    if(abs(difX) > 1.0) {
      this.x = this.x + difX/32.0;
    }

    if(abs(difY) > 1.0) {
      this.y = this.y + difY/32.0;
    }
  }
}
