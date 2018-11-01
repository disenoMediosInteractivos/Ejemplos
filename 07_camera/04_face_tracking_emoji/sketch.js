var capture; // variable para guardar la captura
var tracker; // variable para guardar el tracker
var canvas;  // variable para guardar el canvas

var w = 640; //ancho
var h = 480; //alto

var rec; //variable para guardar el cuadrado que se va a dibujar
var img; //variable para guardar imagen

var caraDetec = false;

function preload(){
  img = loadImage('emoji_01.png'); //carga el archivo de imagen
}
function setup() {

  //Define la densidad de pixeles para que la imagen sea igual en todos los dispositivos
  pixelDensity(1);
  capture = createCapture(VIDEO); //crea una captura de video

  capture.size(w, h); //define el tamaño de la captura
  canvas = createCanvas(w, h); //crea un canvas del tamaño de la captura

  capture.parent('container'); //incluye a la captura dentro del elemento 'container'
  canvas.parent('container'); //incluye al canvas dentro del elemento 'container'

  activarTracking(); //activa el tracking de caras

  rec = new rec(); //inicializa rec como objeto de tipo rec()
}

function draw() {

  //si reconoce una cara
  if (caraDetec){
    //dibuja una imagen en la posición de la cara
    image(img, rec.x, rec.y, rec.w, rec.h);
  }
}

function activarTracking() {
  tracker = new tracking.ObjectTracker(['face']);
  capture.elt.id = 'p5video';
  tracker.setInitialScale(4);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.05);

  tracking.track('#p5video', tracker, {
       camera: true
   });

   /*
   / Esta es la parte importante!!!!
   /cada vez que se detecte una cara
   / se lanza un evento
   / y se devuele un objeto con x, y, alto y ancho
   */

  tracker.on('track', function (event) {
    caraDetec = false; //en cada frame vuelve a revisar si hay caras
    clear(); //se eliminan los eventos anteriores

    event.data.forEach(function (r) { //recorre la lista de grupos encontrados

      //actualiza la posicion del cuadrado
      rec.mover(r.x, r.y, r.width, r.height);
      caraDetec = true; //solo si hay una cara en la pantalla esto es true
    })
  });
}

//funcion rec
function rec(){

  //inicia la posicion y dimensiones de un cuadrado
  this.x = -10;
  this.y = -10;
  this.w = 0;
  this.h = 0;

  //esta funcion actualiza las dimensiones y posicion de un cuadrado
  this.mover = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
