var socket;
var display = false;
var tam;
var players = [];
var buttons = [];
var ip = "0.0.0.0:3000"
//var ip = "http://157.253.148.78:3000";

var upbtn, downbtn, leftbtn, rightbtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  tam = Math.min(width, height)/5;

  socket = io.connect(ip);
  socket.emit('start');
  socket.on('display', function(data) {
    display = data;
  });

  if(!display) {

    upbtn = new Button(width/2, height/2 - tam, 'UP');
    downbtn = new Button(width/2, height/2 + tam, 'DOWN');
    leftbtn = new Button(width/2 - tam, height/2, 'LEFT');
    rightbtn = new Button(width/2 + tam, height/2, 'RIGHT');

    buttons.push(upbtn, downbtn, leftbtn, rightbtn);
  }

  socket.on('heartbeat', function(data) {
    players = data;

    for (var i = 0; i < players.length; i++) {
      players[i] = new Player(players[i].x, players[i].y, players[i].velX, players[i].velY)
    }

  });
}

function draw() {

  if (display) {

    background(0);

    for( var i = 0; i < players.length; i++) {

      players[i].mostrar();
      players[i].mover();

      data = {
        x: players[i].x,
        y: players[i].y,
        velX: players[i].velX,
        velY: players[i].velY
      };

      socket.emit('update', data);
    }
  } else {

    background(255, 255, 0);

    for ( var i = 0; i < buttons.length; i++) {

      buttons[i].mostrar();
    }
  }
}

function mousePressed() {
  for ( var i = 0; i < buttons.length; i++) {
    buttons[i].oprimir(mouseX, mouseY);

    if(buttons[i].oprimido){

      data = buttons[i].dir;
      socket.emit('dir', data);

    }
  }
}

function Player(x, y, velx, vely) {
  this.x = x;
  this.y = y;
  this.tam = 20;
  this.velX = velx;
  this.velY = vely;

  this.mostrar = function() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.tam, this.tam);
  }

  this.mover = function() {
    this.x += this.velX * 2;
    this.y += this.velY * 2;

    this.x = constrain(this.x, this.tam, width - this.tam);
    this.y = constrain(this.y, this.tam, height - this.tam);
  }
}

function Button(x, y, dir){
  this. x = x;
  this.y = y;
  this.dir = dir;
  this.tam = Math.min(width, height)/5;
  this.col = color(255);
  this.oprimido = false;

  this.mostrar = function() {

    fill(this.col);
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

  this.oprimir = function(x, y) {
    if( x > this.x - this.tam/2 && x < this.x + this.tam/2 &&
    y > this.y - this.tam/2 && y < this.y + this.tam/2) {
      this.col = color(0, 0, 255);
      this.oprimido = true;
    } else {

      this.col = color(255);
      this.oprimido = false;
    }

  }
}
