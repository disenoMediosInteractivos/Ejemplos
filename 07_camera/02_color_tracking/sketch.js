var capture; // variable para guardar la captura
var tracker; // variable para guardar el tracker
var canvas;  // variable para guardar el canvas

var w = 640; //ancho
var h = 480; //alto

var rojo; //variabla para guardar el rojo
var verde; //variabla para guardar el verde
var azul; //variabla para guardar el azul
var col; //variabla para guardar el color elegido
var rango = 20; //rango de tolerancia de color

//variables para pintar un rectangulo
var x;
var y;
var rw;
var rh;

function setup() {
  //Define la densidad de pixeles para que la imagen sea igual en todos los dispositivos
  pixelDensity(1);
  capture = createCapture(VIDEO); //crea una captura de video

  capture.size(w, h); //define el tamaño de la captura
  canvas = createCanvas(w, h); //crea un canvas del tamaño de la captura

  capture.parent('container'); //incluye a la captura dentro del elemento 'container'
  canvas.parent('container'); //incluye al canvas dentro del elemento 'container'

  obtenerColor(255, 255, 255); //define el blanco como el color inicial para buscar
  activarTracking(); //activa el tracking para el color seleccionado

}

//si el mpuse es presionado cambia el color seleccionado
function mousePressed() {
    //revisa que el mouse se encuentre dentro del canvas
    if (mouseX > 0 && mouseX < width &&
        mouseY > 0 && mouseY < height) {

          capture.loadPixels(); //carga los pixeles de la pantalla
          var sel = capture.get(mouseX, mouseY); //obtiene el pixel donde se encuentra el mouse
          obtenerColor(sel[0], sel[1], sel[2]); //obtiene el color del pixel seleccionado
    }
}

//esta función actualiza el color seleccionado
function obtenerColor(r, g, b) {
  rojo = r; //actualiza el valor rojo
  verde = g; //actualiza el valor verde
  azul = b; //actualiza el valor azul
  col = color(rojo, verde, azul); //actualiza la variable del color
}

function draw() {

  //se pinta un rectangulo con las dimensiones y el lugar recibido
  stroke(col);
  noFill();
  strokeWeight(2);
  rect(x, y, rw, rh);
}

//esta función activa el tracking y encuentra el color seleccionado
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

  //hace el tracking en la captura de la camara
  tracking.track('#p5video', tracker, {
       camera: true
   });

  /*
  / Esta es la parte importante!!!!
  / cada vez que se encuentre un grupo de pixeles del
  / color seleccionado
  / se lanza un evento
  / y se devuele un objeto con las dimensiones
  / del grupo de pixeles
  */

  tracker.on('track', function (event) {
    clear(); //se eliminan los cuadros anteriores

    //esta funcion se ejecutacada vez que encuentra un grupo de pixeles del color seleccionado
    event.data.forEach(function (r) { //recorre la lista de grupos encontrados

      //variable para guardar el mayor tamaño del grupo de pixeles encontrado
      var mayorTam = 0

      if ( r.width * r.height > mayorTam) { //solo si el grupo actual es el más grande
        mayorTam = r.width * r.height; //actualiza el tamaño mayor

        //actualiza las dimensiones del cuadro que se pintara en el draw()
        x = r.x;
        y = r.y;
        rw = r.width;
        rh = r.height;
      }
    })
  });
}
