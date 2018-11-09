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

    upbtn = new Button(width/2, height/2 - tam, 'UP');
    downbtn = new Button(width/2, height/2 + tam, 'DOWN');
    leftbtn = new Button(width/2 - tam, height/2, 'LEFT');
    rightbtn = new Button(width/2 + tam, height/2, 'RIGHT');

    buttons.push(upbtn, downbtn, leftbtn, rightbtn);

  socket.on('newPlayer', function(data) {
    player = data;
    player = new Player(data.id);
    players.push(player);
  });

  socket.on('deletePlayer', function(data) {
    player = data;

    for ( var i = 0; i < players.length; i++){

      if ( players[i].id == data.id ) {
        players.splice(i, 1);
      }
    }
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
