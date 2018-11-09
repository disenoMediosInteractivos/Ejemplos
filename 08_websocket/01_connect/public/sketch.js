var socket;
var ip = "http://157.253.148.78:3000"; //change ip


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();

  socket = io.connect(ip);
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
