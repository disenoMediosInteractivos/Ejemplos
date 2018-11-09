var socket;
var display = false;
var buttons = [];
var ip = "http://157.253.148.78:3000";



var upbtn, downbtn, leftbtn, rightbtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  var tam = Math.min(width, height)/5;

  socket = io.connect(ip);
  console.log('ip', ip);

  socket.emit('start');

  socket.on('display', function(data) {
    display = data;
  });

  upbtn = new Button(width/2, height/2 - tam, 'UP');
  downbtn = new Button(width/2, height/2 + tam, 'DOWN');
  leftbtn = new Button(width/2 - tam, height/2, 'LEFT');
  rightbtn = new Button(width/2 + tam, height/2, 'RIGHT');

  buttons.push(upbtn, downbtn, leftbtn, rightbtn);
}

function draw() {
  if (display){
    background(255, 0, 0);
    //dibujar comida y serpientes
  } else {
    background(255, 255, 0);

    //dibujar controles
    for ( var i = 0; i < buttons.length; i++) {
      buttons[i].mostrar();
    }
  }
}

function Button(x, y, dir){
  this. x = x;
  this.y = y;
  this.dir = dir;
  this.tam = Math.min(width, height)/5;

  this.mostrar = function() {
    fill(255);
    stroke(255, 0, 0);
    strokeWeight(4);
    rectMode(CENTER);
    rect(this.x, this.y, this.tam, this.tam );

    fill(255, 0, 0);
    if (this.dir === "UP") {
      triangle(this.x - this.tam/3, this.y + this.tam/3, this.x, this.y - this.tam/3,
       this.x + this.tam/3, this.y + this.tam/3);
    } else if (this.dir === "DOWN") {
      triangle(this.x - this.tam/3, this.y - this.tam/3, this.x, this.y + this.tam/3,
       this.x + this.tam/3, this.y - this.tam/3);
    } else if (this.dir === "LEFT") {
      triangle(this.x + this.tam/3, this.y - this.tam/3, this.x + this.tam/3, this.y + this.tam/3,
       this.x - this.tam/3, this.y);
    } else if (this.dir === "RIGHT") {
      triangle(this.x - this.tam/3, this.y - this.tam/3, this.x - this.tam/3, this.y + this.tam/3,
       this.x + this.tam/3, this.y);
    }
  }
}
