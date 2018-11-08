var socket;
var display = false;

var upbtn, downbtn, leftbtn, rightbtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  socket = io.connect("http://0.0.0.0:3000");

  socket.emit('start');

  socket.on('display', function(data) {
    display = data;
  });

  upbtn = new Button(width/2, height/4, 'UP');
  downbtn = new Button(width/2, 3 * height/4, 'UP');

}

function draw() {
  if (display){
    background(255, 0, 0);
    //dibujar comida y serpientes
  } else {
    background(255, 255, 0);

    //dibujar controles

  }
}

function Button(x, y, dir){
  this. x = x;
  this.y = y;
  this.dir = dir;
  this.width = 50;

  function mostrar(){
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, tam, tam );
  }
}
