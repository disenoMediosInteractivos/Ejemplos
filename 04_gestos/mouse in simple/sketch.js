//crear una variable donde se guardara el elemento canvas
var canvas;

function setup() {

  //a la variable canvas se le asigna que cree un canvas de pantalla completa
  canvas = createCanvas(windowWidth, windowHeight);

  //cuando el mouse esta dentro del canvas se llama a la funcion adentro
  canvas.mouseOver(adentro);

  //cuando el mouse sale del canvas se llama a la funcion afuera
  canvas.mouseOut(afuera);

  noStroke();
  fill(255);
  textSize(40);
}


//funcion adentro: se activa cuando el mouse entra al canvas
function adentro() {

  //cambia el color de fondo a azul y muestra un texto
  background(0, 0, 255);
  text("El mouse está DENTRO del canvas", 100, 100);

}

//funcion afuera: se activa cuando el mouse sale del canvas
function afuera() {

  //cambia el color de fondo a rojo y muestra un texto
  background(255, 0, 0);
  text("El mouse está FUERA del canvas", 100, 100);
}
