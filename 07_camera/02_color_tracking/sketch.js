var capture; // variable para guardar la captura
var tracker; // variable para guardar el tracker
var canvas;  // variable para guardar el canvas

var w = 640; //ancho
var h = 480; //alto

var rojo; //variabla para guardar el rojo
var verde; //variabla para guardar el verde
var azul; //variabla para guardar el azul
var col; //variabla para guardar el color elegido
var rango = 10; //rango de tolerancia de color

function setup() {
  //Define la densidad de pixeles para que la imagen sea igual en todos los dispositivos
  pixelDensity(1);
  capture = createCapture(VIDEO); //crea una captura de video

  capture.size(w, h); //define el tamaño de la captura
  canvas = createCanvas(w, h); //crea un canvas del tamaño de la captura

  capture.parent('container'); //incluye a la captura dentro del elemento 'container'
  canvas.parent('container'); //incluye al canvas dentro del elemento 'container'

  obtenerColor(255, 255, 255); //define el blanco como el color inicial para buscar
  activarTracking();

}

function mousePressed() {
    if (mouseX > 0 && mouseX < width &&
        mouseY > 0 && mouseY < height) {

          capture.loadPixels();
          var sel = capture.get(mouseX, mouseY);
          obtenerColor(sel[0], sel[1], sel[2]);
    }
}

function obtenerColor(r, g, b) {
  rojo = r;
  verde = g;
  azul = b;
  col = color(rojo, verde, azul);
}

function activarTracking() {

  //Revisa si hay pixeles del color seleccionado
  tracking.ColorTracker.registerColor('seleccion', function(r, g, b) {
    //si el color esta dentro del rango devuelve true
    if (r >= rojo - rango && r <= rojo + rango &&
        g >= verde - rango && g <= verde + rango &&
        b >= azul - rango && b <= azul + rango) {
        return true;
      } else {
        return false;
      }
    });

  //crea un tracker de color
  tracker = new tracking.ColorTracker(['seleccion']);

  //solo si el area de color es mayor a 20px dibuja un cuadro
  tracker.minDimension = 20;
  capture.elt.id = 'p5video';

  tracking.track('#p5video', tracker, {
       camera: true
   });

  tracker.on('track', function (event) {
    clear();
    strokeWeight(2);
    stroke(col);
    noFill();
    event.data.forEach(function (r) {
        rect(r.x, r.y, r.width, r.height);
    })
  });
}
