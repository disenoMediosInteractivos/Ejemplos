var x, y; //variable para la posicion de la bola en x y en y;
var velx, vely; //variables para velocidad o cambio de posicion en el tiempo


function setup() {

  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);

  //inicia las posiciones en el cemtro de la pantalla
  x = width/2;
  y = height/2;

  //la velocidad inicial es 0
  velx = 0;
  velY = 0;

}

function draw() {
  background(0);

  //imprime los valores de rotacion en X y en Y
  fill(255);
  noStroke();
  text("X: " + floor(rotationY), 20, 40);
  text("Y: " + floor(rotationX), 20, 20);
  text("vel X: " + velx, 20, 60);
  text("vel Y: " + vely, 20, 80);

  //asigna valores a la velocidad de acuerdo a la rotación del dispositivo
  velx = map(rotationX, -90, 90, -3, 3);
  vely = map(rotationY, -90, 50, -3, 3);

  //pinta la elipse
  fill(255, 0, 0);
  strokeWeigth(2);
  stroke(255);
  ellipse(x, y, 30, 30);

  //suma la velocidad en x y en y a las posiciones de la elipse
  x = x + velx;
  y = y + velY;

}
