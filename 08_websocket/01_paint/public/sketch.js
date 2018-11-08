var socket;

function setup() {
  createCanvas(400, 400);
  background(80);
  noStroke();

  socket = io.connect("http://0.0.0.0:3000");
  socket.on('mouse', newDrawing);
}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);

  fill(255);
  ellipse(mouseX, mouseY, 10, 10);
}

function newDrawing(data){
  fill(255, 0, 100);
  ellipse(data.x, data.y, 10, 10)
}
