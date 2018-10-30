var capture; //variable para guardar la captura
var tracker; //variable para guardar el tracker

var w = 640; //ancho
var h = 480; //alto

function setup() {
  //Define la densidad de pixeles para que la imagen sea igual en todos los dispositivos
  pixelDensity(1);
  capture = createCapture(VIDEO); //crea una captura de video

  capture.size(w, h); //definde el tamaño de la captura
  createCanvas(w, h); //crea un canvas del tamaño de la captura
  capture.hide(); //esconde la captura

  tracker = new clm.tracker(); //
  tracker.init(pModel);
  tracker.start(capture.elt);
}

function draw() {

  image(capture, 0, 0, w, h); //dibuja la imagen de la camara

  //guarda las posiciones de los puntos de la cara
  var positions = tracker.getCurrentPosition();

  //si se detecto alguna cara
  if (positions.length > 0) {

    //la dibuja
    dibujarCara(positions);

    /*
    / MEDICIÓN DE SONRISA :)
    */

    //los puntos 44 y 50 son las dos esquinas de la cara
    var leftX = positions[44][0]; //posicion x izq
    var leftY = positions[44][1]; //posicion y izq

    var RightX = positions[50][0]; //posicion x der
    var RightY = positions[50][1]; //posicion y der

    //mide la distancia entre las dos esquinas de la cara
    var sonrisa = dist(leftX, leftY, RightX, RightY);

    //dibuja un rectangulo con el nivel de sonrisa
    noStroke();
    fill(0, 255, 0);
    textSize(24);
    text("Nivel de felicidad :)", 20, 40)
    sonrisa = map(sonrisa, 45, 70, 5, width - 60); //mapea el largo del rectangulo
    rect(20, 60, sonrisa, 20);
  }
}

//dibuja los puntos de la cara
function dibujarCara(positions) {

  noFill();
  stroke(0, 255, 0);

  //recorre el arreglo positions y crea una figura con el
  beginShape();
  for (var i = 0; i < positions.length; i++) {
      vertex(positions[i][0], positions[i][1]);
  }
  endShape();

  //pinta una elipse en cada punto de la cara
  noStroke();
  textSize(12);
  for (var i = 0; i < positions.length; i++) {
      fill(255, 0, 0);
      ellipse(positions[i][0], positions[i][1], 4, 4);
      //texto
      //descomentar para conocer el numero de los puntos
      //text(i, positions[i][0], positions[i][1]);
  }
}
