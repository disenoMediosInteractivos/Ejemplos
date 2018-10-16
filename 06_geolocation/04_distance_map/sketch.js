var myMap; //variable para guardar el mapa
var canvas; //variable para guardar el canvas
var mappa; //variable para guardar el mapa


var destino; //variable para guardar el destino
var localizacion; //variable para guardar la localizacion actual
var distancia; //variable para guardar distancia

var destinoSelec = false;

//objeto de opciones con las que se inicializa el mapa
var options = {

  lat: 0, //latitud de centro del mapa
  lng: 0, //longitud de cetro del mapa
  zoom: 8, //zoom inicial
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png" //url de donde se toma la imagen del mapa
}

function setup() {

  //crea un canvas de pantalla completa
   canvas = createCanvas(windowWidth, windowHeight);

  //crea un map ade leaflet
   mappa = new Mappa('Leaflet');

  //Si geoCheck es true es que es posible medir la posicion del dispositivo
  console.log("GeoCheck: " + geoCheck());

  //Se llama a la función doThisOnLocation una vez
  getCurrentPosition(doThisOnLocation);

  //inicializa los puntos de localización fuera del canvas
  destino = new punto(-100, -100, -100, -100);
  localizacion = new punto(-100, -100, -100, -100);

}

//La variable position es un objeto con los datos de localizacion del dispositivo
function doThisOnLocation(position) {

  //se acutalizan las opciones del mapa para que el zoom inicial sea en la posicion del usuario
  options.lat = position.latitude
  options.lng = position.longitude

  //guarda la posicion obtenida en las variables lat y lng del usuario
  localizacion.lat = position.latitude
  localizacion.lng = position.longitude

  //llama a la funcion drawMap
  drawMap();
}

function drawMap() {
  //inicializa el mapa con el objeto options
  myMap = mappa.tileMap(options);

  //pone en la misma posicion del canvas
  myMap.overlay(canvas);

  //cada vez que se mueva o haga zoom en el mapa se dibuja el punto de localizacion
  myMap.onChange(dibujarpuntos);

  //cada vez que se mueva o haga zoom en el mapa se dibuja el punto de destino
  myMap.onChange(pintarDestino);
}

function dibujarpuntos() {

  //borra el canvas
  clear();

  strokeWeight(2);
  stroke(0, 0, 255);

  //convierte a pixeles la latitud y longitud del dispositivo
  var pos = myMap.latLngToPixel(localizacion.lat, localizacion.lng);

  //mueve el punto a la nueva posicion
  localizacion.mover(pos.x, pos.y, localizacion.lat, localizacion.lng);

  //dibuja el punto
  fill(255, 0, 0);
  localizacion.dibujar(20);
  fill(255);

  //convierte a pixeles la latitud y longitud del destino
  var destinoPos = myMap.latLngToPixel(destino.lat, destino.lng);

  //mueve el punto a la nueva posicion
  destino.mover(destinoPos.x, destinoPos.y, destino.lat, destino.lng);

  //dibuja el punto
  destino.dibujar(10);

  //si existe un destino llama a la funcion calcDist()
  if (destinoSelec) {
    localizacion.calcDist(destino);
  }

  //llama a la funcion pintar destino
  pintarDestino();

}

//cada frame se pinta el destino
function draw() {
  pintarDestino();
}


function pintarDestino() {

  //crea un cuadro blanco para pintar los textos
  fill(255);
  noStroke();
  rect(0, height - 140, 350, height);
  fill(0);
  text("Haga clic en un punto del mapa para ver su distancia: ", 20, height - 120);

  //si hay un destino seleccionado
  if (destinoSelec) {

    //calcula la distancia entre el usuario y el destino
    distancia = calcGeoDistance(localizacion.lat, localizacion.lng, destino.lat, destino.lng, 'km')

    //pinta en la pantalla los datos de localizacion
    text("Latitud actual: " + localizacion.lat, 20, height - 100);
    text("Longititud actual: " + localizacion.lng, 20, height - 80);
    text("Latitud destino: " + destino.lat, 20, height - 60);
    text("Longitud destino: " + destino.lng, 20, height - 40);
    text("Distancia: " + distancia + " km", 20, height - 20);

  }
}

function mouseClicked() {
  destinoSelec = true;

  //convierte a pixeles la latitud y longitud del destino
  var position = myMap.pixelToLatLng(mouseX, mouseY);

  //mueve el punto a la nueva posicion
  destino.mover(mouseX, mouseY, position.lat, position.lng);

  //llama a la funcion dibujar puntos
  dibujarpuntos();

}
