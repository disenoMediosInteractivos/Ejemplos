var socket; //variable para el socket

//dirección ip del dispositivo
var ip = "http://0.0.0.0:3000"; //reemplazar!


function setup() {

  createCanvas(windowWidth, windowHeight);
  background(255);

  //conectar el socket al servidor de la ip del dispositivo
  socket = io.connect(ip);

}
