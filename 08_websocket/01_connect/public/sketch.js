var socket; //variable para el socket

//dirección ip del dispositivo
var ip = "http://0.0.0.0:3000"; //reemplazar!


function setup() {

  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();

  //conectar el socket al servidor de la ip del dispositivo
  socket = io.connect(ip);

  //cuando se reciba el mensaje mouse, se ejecuta la funcion newDrawing
  socket.on('mouse', newDrawing);
}
//esta función se ejecuta cada vez que el mouse se arrastra por la pantalla
function mouseDragged() {

  //en la variable data se guarda la posición del mouse
  var data = {
    x: mouseX,
    y: mouseY
  }

  //envia la información del mouse al servidor
  socket.emit('mouse', data);

  //dibuja una elipse en la posición del mouse
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 15, 15);
}

//se ejecuta cuando recibe el mensaje 'mouse del servidor'
function newDrawing( data ) { //data son los datos que envia el servidor al socket

  fill(0, 0, 255);

  //dibuja una ellipse en las coordenadas recibidas
  ellipse(data.x, data.y, 15, 15)
}
