var w; //variable para guardar el ancho de la pantalla
var h; //variable para guardar el alto de la pantalla
var c; //variable para el color de fondo
var area; //variable que guarda el area total de al pantalla
function setup() {

  createCanvas(windowWidth, windowHeight); //crea un canvas de pantalla completa

  w = windowWidth; //guarda el ancho de la pantalla en la variable w
  h = windowHeight; //guarda el alto de la pantalla en la variable h
  area = w * h; //area de la ventana es igual a ancho x alto
  c = color(0); //inicializa la variable de color de fondo

  fill(255);
  noStroke();
  textSize(20);

}

function draw() {

  background(c); //pinta el fondo con el color de la variable c
  text("Cambie el tamaño de la pantalla", 30, 40);

}

//funcion que se activa cuando cambia el tamaño de la ventana del navegador
function windowResized() {

  //si la ventana es agrandada
  if (windowWidth * windowHeight > area) {

    //el color de fondo es rojo
    c = color(255, 0, 0);
  }
  else { //si la ventana se hace más pequeña

    //el color de fondo es azul
    c = color(0, 0, 255);
  }

  //se actualiza el nuevo tamano de la pantalla  en las variables w y h
  w = windowWidth;
  h = windowHeight;
  area = w * h; //se recalcula el area de la pantalla

  //se cambia el tamano del canvas para que sea del nuevo tamano de la pantalla
  resizeCanvas(w, h);

}
