var x, y; //variables para posicion de la elipse
var tam; //variable para tamano de la elipse

function setup() {
  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);
  background(0);

  //inicializa las variables de posicion y tamano
  x = width/2;
  y = height/2;
  tam = 60;

}

function draw() {
  //efecto de motion blur
  fill(0, 5);
  rect(-3, -3, width+6, height+6);

  //texto
  fill(255);
  noStroke();
  text("Mueva la elipse con el dedo", 20, 30);

  //pinta la elipse en la posicion x, y
  fill(255, 0, 0);
  stroke(255);
  strokeWeight(3);
  ellipse(x, y, tam, tam);

}

//esta funcion se activa cuando el dispositivo reconoce que se movio un toque en la pantalla
function touchMoved() {

    //revisa si se estaba tocando la bola
    //se usa touches[0] porque se asume que solo hay un toque a la vez
    if (dist(touches[0].x, touches[0].y, x, y) < tam/2) {

      //actualiza la posicion de la elipse con la posicion del toque
      x = touches[0].x;
      y = touches[0].y;
    }
  return false; //elimina el comportamiento estandar del navegador al arrastrar un toque
}
