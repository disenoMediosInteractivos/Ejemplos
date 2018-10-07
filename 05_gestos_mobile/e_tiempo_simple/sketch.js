//contador de tiempo presionado
var contador;

//variable para saber si esta contando o no
var contar;

function setup() {
  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);

  contador = 0;
  contar = false;
}

function draw() {
  background(0);

  //texto
  fill(255);
  noStroke();
  text("Mantenga presionada la pantalla para crear una elipse", 20, 20);
  text("Tiempo presionado: " + contador, 20, 40);

  //contar: la cuenta aumenta si contar es true y si el numero de frame es multiplo de 10
  if (frameCount % 10 != 0 && contar) {

    //aumenta el valor del contador
    contador++;
  }

  //va dibujando la elipse mientras se esta presionando la pantalla
  if (contar) {
    stroke(255);
    strokeWeight(4);
    fill(255, 0, 0);

    //el valor del contador determina el tamaño de la elipse
    ellipse(mouseX, mouseY, contador, contador);
  }
}

//esta funcion se activa cuando la pantalla es tocada: cambia contar a verdadero
function touchStarted() {
  contar = true;
}

//cuando se deja de tocar la pantalla se activa esta funcion
function touchEnded() {

  //contar vuelve a ser falso y se reinicia el contador
  contar = false;
  contador = 0;
}
