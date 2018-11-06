var capture; // variable para guardar la captura
var tracker; // variable para guardar el tracker de color
var canvas;  // variable para guardar el canvas

var w = 640; //ancho
var h = 480; //alto

//variables para pintar un rectangulo
var x;
var y;

function setup() {
  //Define la densidad de pixeles para que la imagen sea igual en todos los dispositivos
  pixelDensity(1);
  capture = createCapture(VIDEO); //crea una captura de video

  capture.size(w, h); //define el tamaño de la captura
  canvas = createCanvas(w, h); //crea un canvas del tamaño de la captura

  capture.parent('container'); //incluye a la captura dentro del elemento 'container'
  canvas.parent('container'); //incluye al canvas dentro del elemento 'container'

  activarTracking(); //activa el tracking para el color seleccionado

  //texto
  fill(255, 0, 0);
  textSize(20);
  text("Pinte con algo amarillo (su carné)", 30, 40);
  text("Oprima el mouse para borrar todo", 30, 70);

}

function draw() {

  //se pinta un rectangulo con las dimensiones y el lugar recibido
  fill(255, 255, 0);
  noStroke();
  ellipse(width - x, y, 15, 15);

}

//esta función activa el tracking y encuentra el color seleccionado
function activarTracking() {

  //crea un tracker de color
  tracker = new tracking.ColorTracker(['yellow']);

  capture.elt.id = 'p5video';

  //hace el tracking en la captura de la camara
    tracking.track('video', tracker);

  /*
  / Esta es la parte importante!!!!
  / cada vez que se encuentre un grupo de pixeles del
  / color seleccionado
  / se lanza un evento
  / y se devuele un objeto con las dimensiones
  / del grupo de pixeles
  */
  tracker.on('track', function (event) {

    //clear(); //se eliminan los cuadros anteriores

    //esta funcion se ejecutacada vez que encuentra un grupo de pixeles del color seleccionado
    event.data.forEach(function (r) { //recorre la lista de grupos encontrados

       //calcula el centro del cuadro
        x = r.x + (r.width/2);
        y = r.y + (r.height/2);

    })
  });
}

function mousePressed() {
    //borra el canvas
    clear();

    //texto
    fill(255, 0, 0);
    textSize(20);
    text("Pinte con algo amarillo (su carné)", 30, 40);
    text("Oprima el mouse para borrar todo", 30, 70);
}
