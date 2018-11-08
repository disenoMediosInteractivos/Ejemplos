var socket;
var display;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  socket = io.connect("http://0.0.0.0:3000");

  socket.emit('start');

  socket.on('display', function(data) {
    display = data;
    console.log('soy display? ', display);
  });

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
