var r, g, b; //variables r, g y b para el color de relleno

function setup() {

  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);
  background(0);

  //inicializa las variables de color en 0;
  r = 0;
  g = 0;
  b = 0;
}

function draw() {
  background(0);

  //texto
  fill(255);
  noStroke();
  text("AccX: " + accelerationX, 30, 30);
  text("AccY: " + accelerationY, 30, 50);
  text("AccZ: " + accelerationZ, 30, 70);

  //establece el relleno con los valores r, g y b
  fill(r, g, b);

  //pinta una elipse
  ellipse(width/2, height/2, width/4, width/4);
}

//cuando el dispositivo detecta movimiento llama a la funcion acelerar de la bola
function deviceMoved() {

  //asigna un valor a cada componente de color dependiendo de la aceleracion del dispositivo
  r = map(accelerationX, -90, 90, 0, 255); //rojo depende de aceleracion en x
  g = map(accelerationY, -90, 90, 0, 255); //verde depende de aceleracion en y
  b = map(accelerationZ, -90, 90, 0, 255); //azul depende de aceleracion en z
}
