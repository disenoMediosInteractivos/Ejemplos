var vel = 0; //variable para guardar la velocidad del mouse
var r, g; //variables para colores del fondo;

function setup() {
  
  createCanvas(windowWidth, windowHeight); //crea un canvas de pantalla completa
  fill(255);
  noStroke();
  textSize(20);

  r = 0; //cantidad de rojo del color de fondo inicia en 0
  g = 255; //cantidad de verde del color de fondo inicia en 255

}

function draw() {
  background(r, g, 255); //asigna las variables de color al fondo

  //difX es la resta de la posicion x del mouse actual con la posicion del mouse anterior
  var difX = abs(mouseX - pmouseX);

  //difY es la resta de la posicion y del mouse actual con la posicion del mouse anterior
  var difY = abs(mouseY - pmouseY);

  //con floor() se redondea la velocidad a un numero entero
  //para simplificar, se puede tomar la velocidad como la suma de las diferencias en posicion en x y en y
  var vel = floor(difX + difY);

  //texto que muestra la velocidad en la pantalla
  fill(255);

  text("Velocidad del ratón: " + vel, 30, 40);

  //revisa que la velocidad del mouse sea mayor a 80
  if (vel > 80) {

    r+= vel/80; //aumenta el valor del rojo
    g-= vel/80; //disminuye el valor del verde

  } else { //si la velocidad es menor a 80

    r--; //disminuye el valor del rojo
    g++; //aumenta el valor del verde

  }

  //constrain: evita que las variables se salgan de un rango entre 0 y 255
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);

}
