var x, y; //variables para posicion de la elipse
var tam; //variable para tamano de la elipse

function setup() {
  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);

  //inicializa las variables de posicion y tamano
  x = width/2;
  y = height/2;
  tam = 30;

}

function draw() {
  background(0);

  //pinta la elipse en la posicion x, y
  fill(255, 0, 0);
  stroke(255);
  strokeWeigth(2);
  ellipse(x, y, tam, tam);

}

//esta funcion se activa cuando el dispositivo reconoce que se movio un toque en la pantalla
function touchMoved() {

    //revisa si se estaba tocando la bola
    //se usa touches[0] porque se asume que solo hay un toque a la vez
    if (dist(touches[0].x, touches[0].y, x, y) < 15) {

      //actualiza la posicion de la elipse con la posicion del toque
      x = touches[0].x;
      y = touches[0].y;
    }
}
