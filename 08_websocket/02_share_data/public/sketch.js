var socket;
var players = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  socket = io.connect("http://0.0.0.0:3000");

  
}
