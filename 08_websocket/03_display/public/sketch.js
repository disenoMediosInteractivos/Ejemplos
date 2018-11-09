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

  socket.on('newPlayer', function(data) {
    player = data;
    player = new Player(data.id);
    players.push(player);
  });

  socket.on('change', function(data) {

    for( var i = 0; i < players.length; i++ )
    {

      if( players[i].id == data.id ) {

        players[i].velX = data.velX;
        players[i].velY = data.velY;

      }
    }

  });
}

function draw() {

  if (display) {

    background(0);

    for( var i = 0; i < players.length; i++) {

      players[i].mostrar();
      players[i].mover();

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

function Player(id) {
  this.id = id;
  this.x = 50;
  this.y = 50;
  this.tam = 20;
  this.velX = 1;
  this.velY = 0;

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
