var socket;

function setup() {
  createCanvas(400, 400);
  background(0, 0, 255);

  stroke(255);
  strokeWeight(2);
  fill(255, 0, 0);

  socket = io.connect("http://192.168.0.6:3000");
}

function mouseDragged() {
  ellipse(mouseX, mouseY, 10, 10);
}
