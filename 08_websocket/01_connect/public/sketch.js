var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();

  socket = io.connect("http://0.0.0.0:3000");
  socket.on('mouse', newDrawing);
}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  }

  //envia la información del mouse
  socket.emit('mouse', data);

  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 15, 15);
}

//recibe información del servidor
function newDrawing(data){
  fill(0, 0, 255);
  ellipse(data.x, data.y, 15, 15)
}
