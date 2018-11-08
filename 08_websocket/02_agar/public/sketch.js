var socket;
var p;
var c = [];
var numComida = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  socket = io.connect("http://0.0.0.0:3000");

  p = new player();

  for (var i = 0; i < 20; i++){
    c[i] = new comida();
  }

}

function draw(){
  background(0, 200, 0);
  p.mostrar();
  p.mover(mouseX, mouseY);

  for (var i = 0; i < 20; i++){
    c[i].mostrar();

    if( dist( p.x, p.y, c[i].x, c[i].y ) < p.tam/2 ){

      c[i].morir();
      p.crecer(c[i].tam);
    }
  }
}

function player() {
  this.x = random(width);
  this.y = random(height);
  this.tam = 30;

  this.mostrar = function() {
    fill(0, 50, 0);
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  this.mover = function(mx, my) {
    var difX = mx - this.x;
    var difY = my - this.y;

    if(abs(difX) > 1.0) {
      this.x = this.x + difX/32.0;
    }

    if(abs(difY) > 1.0) {
      this.y = this.y + difY/32.0;
    }
  }

  this.crecer = function(tamExtra) {
    this.tam += tamExtra*0.2;
  }
}

function comida() {
  this.x = random(width);
  this.y = random(height);
  this.tam = 10;

  this.mostrar = function(){
    fill(255);
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  this.morir = function() {
    this.x = random(width);
    this.y = random(height);
  }
}
