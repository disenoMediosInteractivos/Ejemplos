//crear variables de posición y tamaño para la elipse
var x;
var y;
var tam;

function setup() {

  createCanvas(windowWidth, windowHeight); //crea un canvas de pantalla completa

  //aca se define la posición inicial de la elipse
  x = width/2; //posicion en x
  y = height/2; //posicion en y
  tam = 50; //tamaño
}

function draw() {
  background(0);

  //texto
  noStroke();
  fill(255);
  text("Arrastre la bola por la pantalla" , 30, 30);

  //pinta una elipse en la posicion x, y
  strokeWeight(2);
  fill(255, 0, 0);
  stroke(255);
  ellipse(x, y, tam, tam);
}

//funcion que se activa si el mouse es arrastrado
function mouseDragged() {

  //revisa si la posición del mouse es cercana a la posicion de la ellipse
  if (dist(mouseX, mouseY, x, y) < tam / 2 + 10) {

    //actualiza la posicion de la elipse con la posición del mouse
    x = mouseX;
    y = mouseY;
  }
}
